import React, { useContext } from 'react';
import styled from 'styled-components';
import AppContext from '../../context/appContext';
import Menu from '../Menu/Menu';
import mapMembers from '../../utils/mapMembers';

const Form = styled.form`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #000;
`;

const DropDownList: React.FC = () => {
  const { members } = useContext(AppContext);

  return (
    <Form name='members-form'>
      <Menu isShowBtn={!!true} data={mapMembers(members)} />
    </Form>
  );
};

export default DropDownList;
