import React from 'react';
import styled from 'styled-components';
import Menu from '../Menu/Menu';

const Form = styled.form`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #000;
`;

const DropDownList: React.FC = () => (
  <Form name='members-form'>
    <Menu />
  </Form>
);

export default DropDownList;
