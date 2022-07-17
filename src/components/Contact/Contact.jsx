import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import { useRef } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import Button from 'components/Button';
import { Item, ButtonWrap } from './Contact.styled';

const Contact = ({ item, onClick, onInfo, animationTimeOut, ...rest }) => {
  const { id, name, mobilePhone } = item;
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
        {name}:<span>{mobilePhone}</span>
        <ButtonWrap>
          <Button onClick={() => onInfo(id)}>More info</Button>
          <Button onClick={() => onClick(id)}>Delete</Button>
        </ButtonWrap>
      </Item>
    </CSSTransition>
  );
};

Contact.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    mobilePhone: PropTypes.string.isRequired,
  }),
  onClick: PropTypes.func.isRequired,
};

export default Contact;
