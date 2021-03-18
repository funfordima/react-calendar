import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Menu from '../Menu/Menu';
import mapMembers from '../../utils/mapMembers';
import { Members } from '../../Redux/interfaces';

const Form = styled.form`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #000;
`;

interface DropDownListProps {
  users: Members[];
}

const DropDownList: React.FC<DropDownListProps> = ({ users }) => (
  <Form name='members-form'>
    <Menu isShowBtn={!!true} data={mapMembers(users)} />
  </Form>
);

const mapStateToProps = (state: any) => ({
  users: state.users,
});

export default connect(mapStateToProps)(DropDownList);
