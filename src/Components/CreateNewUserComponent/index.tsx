import React from 'react';
import styled from 'styled-components';

const ModalTitle = styled.h3`
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

const CreateNewUserComponent: React.FC = () => (
  <>
    <ModalTitle tab-index='0'>
      Create New User
        </ModalTitle>
    <ModalForm name='modal-form'>
      <ModalRow>
        <Label htmlFor='addMember'>
          Member
            </Label>
        <Input
          id='addMember'
          type='text'
          tab-index='0'
          name='member-name'
          placeholder='add member'
        />
      </ModalRow>
    </ModalForm>
  </>
);

export default CreateNewUserComponent;
