import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch } from 'react-redux';
import { useDeleteContactMutation } from 'redux/contacts/contacts-slice';
import { toast } from 'react-toastify';
import { setModalOpen } from '../../redux/isOpen/isOpen-actions';
import { Modal, Backdrop } from './AgreementModal.styled';
import Button from 'components/Button';

const modalRoot = document.querySelector('#modal-root');

const AgreementModal = forwardRef(({ id }, ref) => {
  const [deleteContact, result] = useDeleteContactMutation();
  console.log(result);
  const dispatch = useDispatch();

  const checkAgreement = answear => {
    if (answear) {
      deleteContact(id);
      toast.success('Contact was deleted');
    }
    dispatch(setModalOpen(false));
  };

  return createPortal(
    <Backdrop ref={ref}>
      <Modal>
        <p>Do you really want delete this contact?</p>
        <Button onClick={() => checkAgreement(false)} padding={'5px 15px'}>
          No
        </Button>
        <Button onClick={() => checkAgreement(true)} padding={'5px 15px'}>
          Yes
        </Button>
      </Modal>
    </Backdrop>,
    modalRoot
  );
});

AgreementModal.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default AgreementModal;
