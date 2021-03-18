import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { AlertError, AlertSuccess, ModalTitle, ModalForm, Label, Input, ModalRow } from '../styledComponents';
import User from '../../utils/User';
import Admin from '../../utils/Admin';
import { MEMBERS, MAIN_URL, message } from '../../constants/constants';
import { Members } from '../../interfaces';
import Data from '../../utils/data';
import { updateMembers, fetchUpdateSuccess, fetchUpdateError } from '../../Redux/actions';

const CheckBox = styled(Input)`
margin-left: 2rem;
  width: 1.5rem;
  height: 1.5rem;
`;

const Button = styled.input`
  display: block;
  font-family: 'Open Sans', Helvetica, Arial, sans-serif;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.75em;
  letter-spacing: 1px;
  height: 3.8rem;
  width: 12rem;
  line-height: 3.8rem;
  overflow: hidden;
  border-radius: 3px;
  box-shadow: 0 1.5rem 3rem rgba(0, 0, 0, 0.1);
  border: 0;
  cursor: pointer;
  outline: none;
  transition: all 0.3s ease;

  &:hover,
  &:focus {
    box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.5);
  }

  &:disabled {
    box-shadow: 0 1.5rem 3rem rgba(0, 0, 0, 0.1);
    cursor: auto;
  }
`;

interface CreateUserComponentProps {
  handleCloseModal: () => void;
  onFetch: (param: string, body: Members[]) => void;
  isUpdate: string;
  error: string;
}

const CreateNewUserComponent: React.FC<CreateUserComponentProps> = ({ handleCloseModal, onFetch, isUpdate, error }) => {
  const [memberName, setMember] = useState('');
  const [isShowAlert, setShowAlert] = useState('');
  const [isChecked, setChecked] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const { wrongName, existName } = message;

  const handleCreateUser = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const user = isChecked ? new Admin(memberName) : new User(memberName);

    const members = JSON.parse(String(localStorage.getItem(MEMBERS)));

    const condition = members.find(({ name }: Members) => (name.toLowerCase() === memberName.toLowerCase()));

    if (condition) {
      setShowAlert(existName);
    } else {
      setShowAlert('');
      members.push(user);

      onFetch(MEMBERS, members);

      if (isUpdate) {
        setTimeout(() => {
          handleCloseModal();
        }, 2000);
      }
    }
  };

  if (isUpdate) {
    setTimeout(() => {
      handleCloseModal();
    }, 2000);
  }

  const handleChangeName = ({ target }: React.ChangeEvent<HTMLInputElement>): void => {
    setMember(target.value);
  };

  const validateName = ({ target }: React.ChangeEvent<HTMLInputElement>): void => {
    const newName = target.value;
    const minNameLength = 2;

    if (newName.trim().length < minNameLength) {
      setShowAlert(wrongName);
    } else {
      setShowAlert('');
    }
  };

  const handleSetCheck = (): void => {
    setChecked((state) => !state);
    setShowAlert('');
  };

  useEffect(() => {
    (inputRef.current as HTMLInputElement).focus();
  }, []);

  return (
    <>
      <ModalTitle tab-index='0'>
        Create New User
        </ModalTitle>
      <ModalForm name='modal-form' onSubmit={handleCreateUser}>
        <ModalRow>
          <Label htmlFor='addMember'>
            Member
            </Label>
          <Input
            id='addMember'
            ref={inputRef}
            type='text'
            tab-index='0'
            name='member-name'
            placeholder='add member'
            value={memberName}
            onChange={handleChangeName}
            onBlur={validateName}
          />
        </ModalRow>
        <ModalRow>
          <Label htmlFor='isAdmin'>
            Create Admin
          </Label>
          <CheckBox
            id='isAdmin'
            type='checkbox'
            tab-index='0'
            name='is-admin'
            checked={isChecked}
            onChange={handleSetCheck}
          />
        </ModalRow>
        <ModalRow>
          <Button
            className='submit-button state-0'
            type='submit'
            value='Confirm'
            name='modal-submit'
            tab-index='0'
            aria-label='Confirm'
            disabled={!!isShowAlert}
          />
          <Button
            className='cancel-button'
            type='button'
            value='Cancel'
            name='modal-cancel'
            tab-index='0'
            aria-label='Cancel'
            onClick={handleCloseModal}
          />
        </ModalRow>
      </ModalForm>
      {isShowAlert
        && <AlertError>
          {isShowAlert}
        </AlertError>
      }
      {error
        && <AlertError>
          {error}
        </AlertError>
      }
      {isUpdate
        && <AlertSuccess>
          {isUpdate}
        </AlertSuccess>}
    </>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  onFetch: (param: string, body: Members[]) => {
    new Data(MAIN_URL).sendData(param, body)
      .then(res => {
        if (!res.ok) {
          throw new Error('something was wrong')
        }
        return res.json();
      })
      .then(({ data }) => {
        const receivedMembers = JSON.parse(data);
        dispatch(updateMembers(receivedMembers as Members[]))
      })
      .then(() => dispatch(fetchUpdateSuccess(message.success)))
      .then(() => {
        setTimeout(() => dispatch(fetchUpdateSuccess('')), 2100);
      })
      .catch((e) => dispatch(fetchUpdateError(e.message)))
      .finally(() => {
        setTimeout(() => dispatch(fetchUpdateError('')), 2100);
      });
  }
});

const mapStateToProps = (state: any) => ({
  isUpdate: state.isUpdate,
  error: state.error,
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewUserComponent);
