import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import mainContext from '../../context/mainContext';
import { UserButton } from '../styledComponents';
import ModalDialog from '../ModalDialog';
import CreateNewUserComponent from '../CreateNewUserComponent';
import User from '../../utils/User';

const Container = styled.div`
  margin: 20px auto;
  width: 100%;
  max-width: 70rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  justify-content: space-around;

  @media (max-width: 601px) {
    padding: 0 10px;
  }
`;

const AddMemberButton = styled(UserButton)`
  position: relative;
  background: #e1e1e1;
  transition-property: color;
  transition-duration: 0.3s;

  &:before {
    content: '';
    position: absolute;
    z-index: -1;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #2098d1;
    transform: scaleY(0);
    transform-origin: 50%;
    transition-property: transform;
    transition-duration: 0.3s;
    transition-timing-function: ease-out;
  }

  &:hover {
    color: white;

    &:before {
      transform: scaleX(1);
    }
  }
`;

const ChangeMemberButton = styled(UserButton)`
  transition-property: color;
  transition-duration: 0.3s;

  &:before {
    content: '';
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #2098d1;
    transform: scaleX(0);
    transform-origin: 0 50%;
    transition-property: transform;
    transition-duration: 0.3s;
    transition-timing-function: ease-out;
  }

  &:hover {
    color: white;

    &:before {
      transform: scaleX(1);
    }
  }
`;

const AddEventButton = styled(NavLink)`
  display: flex;
  width: 15rem;
  padding: 0.8rem 1.6rem;
  font-size: 1.4rem;
  border: solid 1px #c7ccd1;
  border-radius: 0.5rem;
  justify-content: center;
  text-decoration: none;
  transition: all 0.2s ease-out;
  cursor: pointer;
  font-weight: bold;
  background-color: #ffffff;
  color: #333333;

  &:hover {
    color: #ffffff;
    background-color: #81c784;
  }

  @media (max-width: 767px) {
    padding: 0.5rem 1rem;
    width: 18rem;
  }
`;

const ControlButtonPanel: React.FC = () => {
  const [isShow, setShow] = useState(false);
  const { user, setUser } = useContext(mainContext);

  const addNewUser = (): void => {
    setShow(true);
  };

  const handleCloseModal = (): void => {
    setShow(false);
  };

  const handleChangeUser = (): void => {
    setUser(new User(''));
  };

  const { isAdmin } = user;

  return (
    <>
      {isShow
        && <ModalDialog>
          <CreateNewUserComponent handleCloseModal={handleCloseModal} />
        </ModalDialog>}
      <Container>
        {isAdmin
          && <AddMemberButton
            type='submit'
            value='New Member +'
            onClick={addNewUser}
          >
            New Member +
        </AddMemberButton>
        }
        <ChangeMemberButton
          type='button'
          value='Change User'
          onClick={handleChangeUser}
        >
          Change User
        </ChangeMemberButton>
        {isAdmin
          && <AddEventButton
            to='/events'
          >
            New Event +
          </AddEventButton>
        }
      </Container>
    </>
  );
};
export default ControlButtonPanel;
