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
    height: 8rem;
    flex-direction: column;
  }
`;

const HeaderTitle = styled.h1`
  width: 10rem;
  font-size: 2.5rem;
  transform: perspective(1px) translateZ(0);
  transition-duration: 0.3s;
  transition-property: transform;

  &:before {
    pointer-events: none;
    position: absolute;
    z-index: -1;
    content: '';
    top: 100%;
    left: 5%;
    height: 10px;
    width: 90%;
    opacity: 0;
    background: radial-gradient(
      ellipse at center,
      rgba(0, 0, 0, 0.35) 0%,
      rgba(0, 0, 0, 0) 80%
    );
    transition-duration: 0.3s;
    transition-property: transform, opacity;
  }

  &:hover {
    transform: translateY(-5px);

    &:before {
      opacity: 1;
      transform: translateY(5px);
    }
  }
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
