import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { useDispatch } from 'react-redux';
import { useEditContactMutation } from 'redux/contacts/contacts-slice';
import { forwardRef } from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import _ from 'lodash/fp';
import { setContactInfoOpen } from 'redux/isOpen/isOpen-actions';
import {
  Backdrop,
  Modal,
} from 'components/AgreementModal/AgreementModal.styled';
import {
  InfoForm,
  InfoInput,
  InfoButton,
  InfoLabel,
} from './ContactInfo.styled';

const modalRoot = document.querySelector('#modal-root');

const ContactInfo = forwardRef(({ id, data }, ref) => {
  const [editContact, result] = useEditContactMutation();
  console.log(result);
  const dispatch = useDispatch();
  const contactID = id;
  const { name, mobilePhone, homePhone, company } = data.find(
    ({ id }) => id === contactID
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ criteriaMode: 'all' });

  const handleClose = e => {
    if (e.target === e.currentTarget) {
      dispatch(setContactInfoOpen(false));
    }
  };

  const onSubmit = data => {
    const contactData = { id: contactID, ...data };
    editContact(contactData);
    dispatch(setContactInfoOpen(false));
  };

  return createPortal(
    <Backdrop ref={ref} onClick={e => handleClose(e)}>
      <Modal>
        <InfoForm onSubmit={handleSubmit(onSubmit)}>
          <InfoLabel>
            Name
            <InfoInput
              defaultValue={name}
              {...register('name', {
                required: 'Name is required.',
                pattern: /[A-Za-z]{3}/,
                maxLength: {
                  value: 30,
                  message: 'This input exceed maxLength.',
                },
              })}
            />
            <ErrorMessage
              errors={errors}
              name="name"
              render={({ messages }) =>
                messages &&
                Object.entries(messages).map(([type, message]) => (
                  <p key={type}>{message}</p>
                ))
              }
            />
          </InfoLabel>
          <InfoLabel>
            Mobile phone
            <InfoInput
              defaultValue={mobilePhone}
              mask="+ 999-99-99-99-999"
              {...register('mobilePhone', {
                required: 'Mobile phone is required.',
                pattern: {
                  value: /[1-9][0-9]*|0/,
                  message: 'This input is number only.',
                },
                minLength: {
                  value: 18,
                  message: 'This phone is too short',
                },
              })}
            />
            <ErrorMessage
              errors={errors}
              name="mobilePhone"
              render={({ messages }) => {
                console.log('messages', messages);
                return messages
                  ? _.entries(messages).map(
                      ([type, message]: [string, string]) => (
                        <p key={type}>{message}</p>
                      )
                    )
                  : null;
              }}
            />
          </InfoLabel>
          <InfoLabel>
            Home phone
            <InfoInput
              defaultValue={homePhone}
              mask="+ 999-99-99-99-999"
              {...register('homePhone', {
                pattern: {
                  value: /[1-9][0-9]*|0/,
                },
              })}
            />
          </InfoLabel>
          <InfoLabel>
            Company
            <InfoInput
              defaultValue={company}
              {...register('company', { pattern: /[A-Za-z]{3}/ })}
            />
          </InfoLabel>
          {errors.exampleRequired && <span>This field is required</span>}
          <InfoButton type="submit">Submit</InfoButton>
        </InfoForm>
      </Modal>
    </Backdrop>,
    modalRoot
  );
});

ContactInfo.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default ContactInfo;
