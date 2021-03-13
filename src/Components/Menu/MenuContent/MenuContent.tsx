import React, { Fragment } from 'react';
import styled from 'styled-components';

const MenuInput = styled.input`
  display: none;

  &:checked + label {
    background-color: #dedede;
  }

  &:disabled + label {
    opacity: 0.6;
    pointer-events: none;
  }
`;

const MenuLabel = styled.label`
  display: flex;
  align-items: center;
  width: 100 %;
  height: 4rem;
  max-height: 0;
  padding: 0 1.6rem;
  background-color: #fff;
  transition: all 0.2s ease-out;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;

  @media(max-width: 601px) {
    height: 3rem;
  }

  & + input + & {
    border-top: 0 solid #c7ccd1;
  }

  &: hover {
    background-color: #d8093a!important;
    color: #ffffff;
  }
`;

interface MenuContentComponentProps {
  data: string[];
  handleClick: (str: string) => void;
}

const MenuContentComponent: React.FC<MenuContentComponentProps> = ({ data, handleClick }) => (
  <>
    {data.map((item) => (
      <Fragment key={item}>
        <MenuInput
          id={`select_${item}`}
          type='radio'
          name='select'
          className='menu__input'
        />
        <MenuLabel
          htmlFor={`select_${item}`}
          tab-index='0'
          className='menu__label'
          onClick={(event) => handleClick(event.currentTarget.textContent as unknown as string)}
        >
          {item}
        </MenuLabel>
      </Fragment>
    ))}
  </>
);

export default MenuContentComponent;
