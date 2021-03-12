import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import Container from '../ControlContainer/ControlContainer';
import DropDownList from '../DropDownList/DropDownList';

const Header = styled.header`
  width: 100%;
  height: 10rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 601px) {
    flex-direction: column;
  }
`;

const HeaderTitle = styled.h1`
  width: 10rem;
  font-size: 2.5rem;
`;

const LogoLink = styled(NavLink)`
  color: #d8093a;
  text-decoration: none;
  cursor: pointer;
`;

const HeaderComponent: React.FC = () => (
  <Header>
    <HeaderTitle>
      <LogoLink exact to='/'>
        Calendar
      </LogoLink>
    </HeaderTitle>
    <Container>
      <DropDownList />
    </Container>
  </Header>
);

export default HeaderComponent;
