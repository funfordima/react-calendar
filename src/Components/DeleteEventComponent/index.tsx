import React from 'react';
import styled from 'styled-components';

const ModalTitle = styled.h3`
  text-align: center;
`;

interface DeleteEventComponentProps {
  eventTitle: string;
}

const DeleteEventComponent: React.FC<DeleteEventComponentProps> = ({ eventTitle }) => (
  <ModalTitle tab-index='0'>
    `Are you sure you want to delete the event: ${eventTitle}?`
  </ModalTitle>
);

export default DeleteEventComponent;
