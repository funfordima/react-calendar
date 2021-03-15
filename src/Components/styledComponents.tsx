import styled from 'styled-components';
import svgError from './public/error.svg';
import svgSuccess from './public/success.svg';

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

export const AlertError = styled.div`
  margin-top: 20px;
  padding: 8px 16px 8px 48px;
  position: relative;
  font-size: 16px;
  line-height: 24px;
  color: #fe5652;
  text-align: left;
  border-radius: 2px;
  border: 1px solid rgba(0,0,0,0.16);
  background-color: rgba(254,86,82,0.08);
  border-color: rgba(254,86,82,0.4);

  &:after {
    content: '';
    position: absolute;
    left: 12px;
    top: 8px;
    width: 24px;
    height: 24px;
    background-image: url(${svgError});
    background-size: 24px 24px;
    background-repeat: no-repeat;
    background-position: center center;
  }
`;

export const AlertSuccess = styled.div`
  margin-top: 20px;
  padding: 8px 16px 8px 48px;
  position: relative;
  font-size: 16px;
  line-height: 24px;
  color: #64dd17;
  text-align: left;
  border-radius: 2px;
  border: 1px solid rgba(0,0,0,0.16);
  background-color: rgba(33,194,134,0.08);
  border-color: rgba(33,194,134,0.4);

  &:after {
    content: '';
    position: absolute;
    left: 12px;
    top: 8px;
    width: 24px;
    height: 24px;
    background-image: url(${svgSuccess});
    background-size: 24px 24px;
    background-repeat: no-repeat;
    background-position: center center;
  }
`;

export const Label = styled.label`
  width: 10rem;
  font-size: 1.5rem;
`;

export const Input = styled.input`
  margin: 0 auto;
  padding-left: 1rem;
  width: 23rem;
  height: 4rem;
  border-radius: 0.5rem;
  border: 1px solid #c7ccd1;
  position: relative;
  outline: none;

  &:hover {
    border: 1px solid #d8093a;
  }
`;

export const ModalTitle = styled.h3`
  margin-bottom: 2rem;
  text-align: center;
`;

export const ModalForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ModalRow = styled.div`
margin-bottom: 2rem;
width: 100%;
display: flex;
align-items: center;
justify-content: space-between;

&:last-of-type {
  margin-top: 2rem;
}

&.-column {
  flex-direction: column;

  & .error-msg {
    margin-top: 1rem;
    font-size: 1.4rem;
    line-height: 1.5;

    &:after {
      width: 2rem;
      height: 2rem;
      background-size: 2rem 2rem;
    }
  }
}
`;
