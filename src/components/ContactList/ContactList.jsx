import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import getFilteredContacts from 'redux/contacts/contacts-selectors';
import { TransitionGroup } from 'react-transition-group';
import { Container } from './ContactList.styled';
import Contact from 'components/Contact';

const ContactList = ({ data, onClick, animationTimeOut }) => {
  const rootState = useSelector(state => state.rootReducer);
  const filteredContacts = getFilteredContacts(data, rootState);

  return (
    <Container>
      <TransitionGroup component="ul" className="contactsList">
        {filteredContacts.map(item => (
          <Contact
            key={item.id}
            item={item}
            onClick={onClick}
            animationTimeOut={animationTimeOut}
          />
        ))}
      </TransitionGroup>
    </Container>
  );
};

ContactList.propTypes = {
  data: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
  animationTimeOut: PropTypes.number.isRequired,
};

export default ContactList;
