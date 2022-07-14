import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import { useRef } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import Button from 'components/Button';
import Item from './Contact.styled';

const Contact = ({ item, onClick, animationTimeOut, ...rest }) => {
  const { id, name, phone } = item;
  const nodeRef = useRef(null);
  return (
    <CSSTransition
      {...rest}
      nodeRef={nodeRef}
      timeout={animationTimeOut}
      classNames="contact-item"
    >
      <Item ref={nodeRef}>
        <FaUserAlt />
        {name}:<span>{phone}</span>
        <Button onClick={() => onClick(id)}>Delete</Button>
      </Item>
    </CSSTransition>
  );
};

Contact.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  }),
  onClick: PropTypes.func.isRequired,
};

export default Contact;
