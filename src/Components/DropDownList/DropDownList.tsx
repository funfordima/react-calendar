import React from 'react';
import styled from 'styled-components';
import Button from '../styledComponents';
import Menu from '../Menu/Menu';

const Form = styled.form`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #000;
`;

const ButtonResetForm = styled(Button)`
  &:hover {
    background-color: #d32f2f;
  }
`;

const DropDownList: React.FC = () => (
  <Form name='members-form'>
    <Menu />
    <ButtonResetForm type='reset' value='Clear it!' />
  </Form>
);

export default DropDownList;
