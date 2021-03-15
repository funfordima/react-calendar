import React, { useRef, useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { AlertError, AlertSuccess, ModalTitle, ModalForm, Label, Input, ModalRow } from '../styledComponents';
import AppContext from '../../context/appContext';
import User from '../../utils/User';
import Admin from '../../utils/Admin';
import { MEMBERS, MAIN_URL, message } from '../../constants/constants';
import { Members } from '../../interfaces';
import Data from '../../utils/data';

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
}

const CreateNewUserComponent: React.FC<CreateUserComponentProps> = ({ handleCloseModal }) => {
  const [memberName, setMember] = useState('');
  const [isShowAlert, setShowAlert] = useState('');
  const [isShowSuccess, setShowSuccess] = useState('');
  const [isChecked, setChecked] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const { setMembers } = useContext(AppContext);

  const { wrongName, existName, success } = message;

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

      new Data(MAIN_URL).sendData(MEMBERS, members)
        .then(() => {
          setShowSuccess(success);

          setTimeout(() => {
            setMembers(members);
            handleCloseModal();
          }, 2000);
        })
        .catch((err) => {
          setShowAlert(err.message);
        });
    }
  };

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
      {isShowSuccess
        && <AlertSuccess>
          {isShowSuccess}
        </AlertSuccess>}
    </>
  );
};

export default CreateNewUserComponent;
