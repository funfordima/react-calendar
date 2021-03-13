import styled from 'styled-components';

export const Button = styled.input`
  display: flex;
  width: 23rem;
  padding: 0.8rem 1.6rem;
  margin: 0 auto;
  border: solid 1px #c7ccd1;
  border-radius: 0.5rem;
  transition: all 0.2s ease-out;
  cursor: pointer;
  font-weight: bold;
  background-color: #ffffff;
  color: #333333;

  &:hover {
    color: #ffffff;
  }

  &.hide {
    display: none;
  }

  @media (max-width: 767px) {
    padding: 0.5rem 1rem;
    width: 18rem;
  }
`;

export const UserButton = styled.button`
  display: flex;
  width: 16rem;
  padding: 0.8rem 1.6rem;
  margin: 0;
  border: solid 1px #c7ccd1;
  border-radius: 0.5rem;
  transition: all 0.2s ease-out;
  cursor: pointer;
  font-weight: bold;
  background-color: #ffffff;
  color: #666;
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px black;

  @media (max-width: 767px) {
    padding: 0.5rem 1rem;
  }
`;

export const MainItem = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 500;
  background-color: #fff;
  position: relative;

  &[data-complete='true'] {
    cursor: pointer;
  }

  @media (max-width: 601px) {
    font-size: 1.5rem;
  }

  &[data-complete='true'] {
    background-color: #d3f5b4;

    & div {
      display: block;
    }

    & h3 {
      display: block;
    }
  }
`;
