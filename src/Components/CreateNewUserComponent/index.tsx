import React, { useRef, useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import MainContext from '../../context/mainContext';
import User from '../../utils/User';
import Admin from '../../utils/Admin';
import { AlertError, AlertSuccess } from '../styledComponents';
import { MEMBERS, MAIN_URL, message } from '../../constants/constants';
import { Members } from '../../interfaces';
import Data from '../../utils/data';
import mapMembers from '../../utils/mapMembers';

const ModalTitle = styled.h3`
  margin-bottom: 2rem;
  text-align: center;
`;

const ModalForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Label = styled.label`
  width: 10rem;
  font-size: 1.5rem;
`;

const Input = styled.input`
  margin: 0 auto;
  padding-left: 1rem;
  width: 23rem;
  height: 4rem;
  border-radius: 0.5rem;
  border: 1px solid #c7ccd1;
  position: relative;
  outline: none;

  &:hover {
    border: 1px solid #d8093a;
  }
`;

const CheckBox = styled(Input)`
margin-left: 2rem;
  width: 1.5rem;
  height: 1.5rem;
`;

const ModalRow = styled.div`
  margin-bottom: 2rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:last-of-type {
    margin-top: 2rem;
  }

  &.-column {
    flex-direction: column;

    & .error-msg {
      margin-top: 1rem;
      font-size: 1.4rem;
      line-height: 1.5;

      &:after {
        width: 2rem;
        height: 2rem;
        background-size: 2rem 2rem;
      }
    }
  }
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

  const { setMembers } = useContext(MainContext);

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
      const NewMembers = mapMembers(members);

      new Data(MAIN_URL).sendData(MEMBERS, members)
        .then(() => {
          setShowSuccess(success);

          setTimeout(() => {
            setMembers(NewMembers);
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
      console.log(123);
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
