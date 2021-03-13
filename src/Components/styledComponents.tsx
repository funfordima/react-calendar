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