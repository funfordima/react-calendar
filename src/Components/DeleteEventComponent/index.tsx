import React from 'react';
import styled from 'styled-components';

const ModalTitle = styled.h3`
  margin-bottom: 3rem;
  text-align: center;
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


interface DeleteEventComponentProps {
  eventTitle: string;
  handleCloseModal: () => void;
  handlerConfirmDeleteEvent: () => void;
}

const DeleteEventComponent: React.FC<DeleteEventComponentProps> = ({ eventTitle, handleCloseModal, handlerConfirmDeleteEvent }) => (
  <>
    <ModalTitle tab-index='0'>
      Are you sure you want to delete the event: &apos;{eventTitle}&lsquo;?
    </ModalTitle>
    <ModalRow>
      <Button
        className='submit-button state-0'
        type='button'
        value='Confirm'
        name='modal-submit'
        tab-index='0'
        aria-label='Confirm'
        onClick={handlerConfirmDeleteEvent}
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
  </>
);

export default DeleteEventComponent;
