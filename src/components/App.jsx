import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setDropListOpen } from 'redux/isOpen/isOpen-actions';
import { useGetContactsQuery } from '../redux/contacts/contacts-slice';
import { Container, StyledToastContainer } from './App.styled';
import { light } from '../themes';
//components imports
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import ContactInfo from './ContactInfo';
import Filter from './Filter';
import AgreementModal from './AgreementModal';
import DropList from './DropList';
import Button from './Button';
import NoteLoader from './NoteLoader';

export function App() {
  let contactId = useRef(null);
  const animationTimeOut = useRef(parseInt(light.animationDuration));
  const modalRef = useRef(null);
  const dropListRef = useRef(null);

  const theme = useSelector(({ rootReducer }) => rootReducer.theme);
  const isDropListOpen = useSelector(
    ({ rootReducer }) => rootReducer.isOpen.dropList
  );
  const isModalOpen = useSelector(
    ({ rootReducer }) => rootReducer.isOpen.agreement
  );
  const isContactInfoOpen = useSelector(
    ({ rootReducer }) => rootReducer.isOpen.contactInfo
  );

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

  const handleClickClose = e => {
    if (e.target === e.currentTarget) {
      dispatch(setDropListOpen(false));
    }
  };

  console.log(data);

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
          <DropList ref={dropListRef}></DropList>
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
            onClick={value => (contactId.current = value)}
            onInfo={value => (contactId.current = value)}
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
          <AgreementModal
            id={contactId.current}
            ref={modalRef}
          ></AgreementModal>
        </CSSTransition>
        <CSSTransition
          nodeRef={modalRef}
          in={isContactInfoOpen}
          timeout={animationTimeOut.current}
          classNames="fade"
          unmountOnExit
        >
          <ContactInfo id={contactId.current} data={data} ref={modalRef} />
        </CSSTransition>
        <StyledToastContainer autoClose={3000} />
      </Container>
    </ThemeProvider>
  );
}
