import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDeleteContactMutation } from '../redux/contacts/contacts-slice';
import { useGetContactsQuery } from '../redux/contacts/contacts-slice';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import AgreementModal from './AgreementModal';
import DropList from './DropList';
import { Container, StyledToastContainer } from './App.styled';
import { light, dark, blue } from '../themes';
import Button from './Button';
import changeTheme from 'redux/theme/theme-actions';
import { setModalOpen, setDropListOpen } from 'redux/isOpen/isOpen-actions';
import NoteLoader from './NoteLoader';

export function App() {
  let deleteContactID = useRef(null);
  const animationTimeOut = useRef(parseInt(light.animationDuration));
  const modalRef = useRef(null);
  const dropListRef = useRef(null);
  const themes = useRef([light, dark, blue]);

  const theme = useSelector(({ rootReducer }) => rootReducer.theme);
  const isDropListOpen = useSelector(
    ({ rootReducer }) => rootReducer.isOpen.dropList
  );
  const isModalOpen = useSelector(
    ({ rootReducer }) => rootReducer.isOpen.modal
  );

  const [deleteContact, result] = useDeleteContactMutation();

  console.log(result);

  const dispatch = useDispatch();

  const {
    data = [],
    isLoading,
    isSuccess,
    error,
  } = useGetContactsQuery({
    pollingInterval: 3000,
    refetchOnMountOrArgChange: true,
  });

  if (error) {
    toast.error(`${error.data}`);
  }

  const checkAgreement = answear => {
    if (answear) {
      deleteContact(deleteContactID.current);
    }
    toast.success('Contact was deleted');
    dispatch(setModalOpen(false));
  };

  const openModalAgreement = id => {
    deleteContactID.current = id;
    dispatch(setModalOpen(true));
  };

  const handleChangeTheme = ({ theme }) => {
    dispatch(changeTheme(theme));
    dispatch(setDropListOpen(false));
  };

  const handleClickClose = e => {
    if (e.target === e.currentTarget) {
      dispatch(setDropListOpen(false));
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container onClick={handleClickClose}>
        <Button
          onClick={() => dispatch(setDropListOpen(true))}
          padding={'5px 32px'}
          position={'absolute'}
          positionY={'30px'}
          positionX={'30px'}
        >
          Choose theme
        </Button>
        <CSSTransition
          nodeRef={dropListRef}
          in={isDropListOpen}
          timeout={animationTimeOut.current}
          classNames="drop"
          unmountOnExit
        >
          <DropList ref={dropListRef}>
            {themes.current.map(theme => {
              return (
                <Button
                  key={theme.name}
                  onClick={() => {
                    handleChangeTheme({ theme });
                  }}
                  padding="5px 10px"
                >
                  {theme.name}
                </Button>
              );
            })}
          </DropList>
        </CSSTransition>
        <h1>Phonebook</h1>
        <ContactForm data={data} />
        <h2>Contacts</h2>
        <Filter />
        {isLoading && <NoteLoader />}
        <CSSTransition
          in={data.length > 0 && isSuccess}
          timeout={animationTimeOut.current}
          unmountOnExit
        >
          <ContactList
            data={data}
            onClick={value => openModalAgreement(value)}
            animationTimeOut={animationTimeOut.current}
          />
        </CSSTransition>
        <CSSTransition
          nodeRef={modalRef}
          in={isModalOpen}
          timeout={animationTimeOut.current}
          classNames="fade"
          unmountOnExit
        >
          <AgreementModal ref={modalRef}>
            <p>Do you really want delete this contact?</p>
            <Button onClick={() => checkAgreement(false)} padding={'5px 15px'}>
              No
            </Button>
            <Button onClick={() => checkAgreement(true)} padding={'5px 15px'}>
              Yes
            </Button>
          </AgreementModal>
        </CSSTransition>
        <StyledToastContainer autoClose={3000} />
      </Container>
    </ThemeProvider>
  );
}
