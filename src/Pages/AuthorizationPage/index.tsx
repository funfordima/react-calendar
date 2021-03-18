import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { updateCurrentUser } from '../../Redux/actions';
import Loader from '../../Components/Loader';
import ModalDialog from '../../Components/ModalDialog';
import Menu from '../../Components/Menu/Menu';
import { ModalTitle, ModalForm, ModalRow } from '../../Components/styledComponents';
import { Members, UpdateCurrentUser } from '../../Redux/interfaces';
import mapMembers from '../../utils/mapMembers';

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

interface AuthorizationPageProps {
  updateUser: (user: Members) => UpdateCurrentUser;
  isLoad: boolean;
  users: Members[];
}

const AuthorizationPage: React.FC<AuthorizationPageProps> = ({ updateUser, isLoad, users }) => {
  const [title, setTitle] = useState('');

  const showTitle = (str: string): void => {
    if (str) {
      setTitle(str);
    }
  };

  const handleClickUser = (): void => {
    const user = users.find(({ name }) => name === title);
    updateUser(user as Members);
  }

  return (
    <>
      {isLoad
        ? <Loader />
        : <ModalDialog>
          <ModalTitle tab-index='0'>
            Choose User
        </ModalTitle>
          <ModalForm name='modal-form'>
            <Menu showTitle={showTitle} data={mapMembers(users)} />
            <ModalRow>
              <Button
                className='submit-button state-0'
                type='button'
                value='Confirm'
                name='modal-submit'
                tab-index='0'
                aria-label='Confirm'
                onClick={handleClickUser}
                disabled={!title}
              />
            </ModalRow>
          </ModalForm>
        </ModalDialog>
      }
    </>
  );
};

const mapDispatchToProps = {
  updateUser: updateCurrentUser,
};

const mapStateToProps = (state: any) => ({
  isLoad: state.isLoad,
  users: state.users,
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthorizationPage);
