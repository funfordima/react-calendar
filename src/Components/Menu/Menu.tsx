import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import MainContext from '../../context/mainContext';
import { Button } from '../styledComponents';
import MenuContentComponent from './MenuContent/MenuContent';
import mapMembers from '../../utils/mapMembers';
import { EVENTS } from '../../constants/constants';
import { Events } from '../../interfaces';

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

const ButtonResetForm = styled(Button)`
  &:hover {
    background-color: #d32f2f;
  }
`;

interface MenuComponentProps {
  isShowBtn?: boolean;
  showTitle?: (title: string) => void;
}

const MenuComponent: React.FC<MenuComponentProps> = ({ isShowBtn = false, showTitle = () => undefined }) => {
  const [isActive, setActive] = useState(false);
  const [isShowTitle, setShowTitle] = useState('');

  const { members, setEvents } = useContext(MainContext);
  const receiveEvents = JSON.parse(String(localStorage.getItem(EVENTS)));

  /* eslint no-param-reassign: 0 */
  const handleClickResetTitle = (): void => {
    setShowTitle('');
    const newEvents = receiveEvents.map((todo: Events) => {
      if (todo.title) {
        todo.complete = true;
      }

      return todo;
    });

    setEvents(newEvents);
  };

  const handleMenuClick = (): void => {
    setActive((state) => !state);
  };

  const handleTitleClick = (str: string): void => {
    setActive((state) => !state);
    setShowTitle(str);
    showTitle(str);

    /* eslint no-param-reassign: 0 */
    if (isShowBtn) {
      const newEvents = receiveEvents.map((todo: Events) => {
        if (!todo.participants.includes(str)) {
          todo.complete = false;
        } else {
          todo.complete = true;
        }

        return todo;
      });

      setEvents(newEvents);
    }
  };

  return (
    <>
      <MenuContainer>
        <Menu
          data-state={isActive ? 'active' : ''}
          className='menu'
          onClick={handleMenuClick}
        >
          <MenuContent className='menu__content'>
            <MenuContentComponent data={mapMembers(members)} handleClick={handleTitleClick} />
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
      {isShowBtn && <ButtonResetForm type='reset' value='Clear it!' onClick={handleClickResetTitle} />}
    </>
  )
};

export default MenuComponent;
