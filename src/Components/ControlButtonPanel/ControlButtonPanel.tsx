import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import mainContext from '../../context/mainContext';
import { Button, UserButton } from '../styledComponents';
import ModalDialog from '../ModalDialog';
import CreateNewUserComponent from '../CreateNewUserComponent';

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

const AddEventButton = styled(Button)`
  margin: 0;

  &:hover {
    background-color: #81c784;
  }
`;

const ControlButtonPanel: React.FC = () => {
  const [isShow, setShow] = useState(false);
  const { user } = useContext(mainContext);

  const addNewUser = (): void => {
    setShow(true);
  };

  const handleCloseModal = (): void => {
    setShow(false);
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
          type='submit'
          value='Change User'
        >
          Change User
        </ChangeMemberButton>
        {isAdmin
          && <AddEventButton
            type='submit'
            value='New Event +'
          />
        }
      </Container>
    </>
  );
};
export default ControlButtonPanel;
