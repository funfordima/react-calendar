import React from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  display: block;
  opacity: 1;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(255, 255, 255, 0.7);
  z-index: 12;
  transition: all 20s ease;

  & .msg {
    margin: 0 auto;
    width: 30rem;
    height: fit-content;
    top: 5%;
    flex-direction: column;
  }
`;

const ModalContainer = styled.div`
  padding: 2rem;
  margin: auto;
  width: 50rem;
  height: 50rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 0;
  top: 0;
  left: 0;
  bottom: 0;
  background: #dedede;
  border: 2px solid #979797;
  z-index: 13;
  transition: all 3s ease;

  @media (max-width: 601px) {
    width: 45rem;
    height: 45rem;
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

interface ModalDialogProps {
  handleCloseModal: () => void;
  children: React.ReactNode;
}

const ModalDialog: React.FC<ModalDialogProps> = ({ handleCloseModal, children }) => (
  <Overlay>
    <ModalContainer className='msg'>
      <ModalRow className='-column'>
        {children}
      </ModalRow>
      <ModalRow>
        <Button
          className='submit-button state-0'
          type='button'
          value='Confirm'
          name='modal-submit'
          tab-index='0'
          aria-label='Confirm'
          disabled
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
    </ModalContainer>
  </Overlay>
);

export default ModalDialog;
