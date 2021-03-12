import React, { useState } from 'react';
import styled from 'styled-components';
import MenuContentComponent from './MenuContent/MenuContent';

const MenuContainer = styled.div`
`;

const Menu = styled.div`
  position: relative;
  width: 23rem;
  height: 4rem;
  margin: 0 auto;

  @media (max-width: 767px) {
    width: 18rem;
    height: 3rem;
  }
`;

const MenuContent = styled.div`
  position: absolute;
  top: 4rem;
  left: 0.3rem;
  display: flex;
  flex-direction: column;
  width: calc(100% - 6px);
  background-color: #ffffff;
  border: 1px solid #c7ccd1;
  border-top: none;
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  transition: all 0.3s ease-out;
  opacity: 0;
  z-index: 8;

  @media (max-width: 767px) {
    top: 3rem;
  }
`;

const MenuTitle = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0.8rem 1.6rem;
  border-radius: 0.5rem;
  border: solid 1px #c7ccd1;
  cursor: pointer;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    right: 1.6rem;
    display: block;
    width: 1rem;
    height: 0.2rem;
    transition: all 0.3s ease-out;
    background-color: #333333;
    transform: translate(-3px, -50%) rotate(45deg);
  }

  &::after {
    transform: translate(3px, -50%) rotate(-45deg);
  }

  &: hover {
    border-color: #d8093a;

    &::before,
    &::after {
      background-color: #d8093a;
    }
  }
`;

const MenuComponent: React.FC = () => {
  const [isActive, setActive] = useState(false);
  const [isShowTitle, setShowTitle] = useState('');

  const handleMenuClick = (): void => {
    setActive((state) => !state);
  };

  const handleTitleClick = (str: string): void => {
    setActive((state) => !state);
    setShowTitle(str);
  };

  return (
    <MenuContainer>
      <Menu
        data-state={isActive ? 'active' : ''}
        className='menu'
        onClick={handleMenuClick}
      >
        <MenuContent className='menu__content'>
          <MenuContentComponent data={['Tamara', 'Nick']} handleClick={handleTitleClick} />
        </MenuContent>
        <MenuTitle
          className='menu__title'
          data-default={isShowTitle}
          tab-index='0'
        >
          {isShowTitle}
        </MenuTitle>
      </Menu>
    </MenuContainer>
  )
};

export default MenuComponent;
