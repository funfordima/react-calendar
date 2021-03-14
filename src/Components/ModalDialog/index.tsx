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

interface ModalDialogProps {
  children: React.ReactNode;
}

const ModalDialog: React.FC<ModalDialogProps> = ({ children }) => (
  <Overlay>
    <ModalContainer className='msg'>
      <ModalRow className='-column'>
        {children}
      </ModalRow>
    </ModalContainer>
  </Overlay>
);

export default ModalDialog;
