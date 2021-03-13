import React from 'react';
import styled from 'styled-components';
import { ReactComponent as GitSvg } from './assets/git.svg';

const Footer = styled.footer`
  height: 7.7rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0.5em;
  flex: 0 0 auto;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Container = styled.div`
  padding: 1rem;

  & svg {
    width: 7rem;
    height: 7rem;
    transition: 0.3s;
    pointer-events: none;
    cursor: pointer;

    @media (max-width: 601px) {
      width: 5rem;
      height: 5rem;
    }
  }

  & a {
    display: flex;
    align-items: center;
    font-size: 2rem;
    color: inherit;
    text-decoration: none;
    cursor: pointer;

    &:hover {
      opacity: 0.9;
    }
  }
`;

const FooterComponent: React.FC = () => (
  <Footer>
    <Wrapper>
      <Container>
        <a href='https://github.com/funfordima'>
          Dima Litvinov
        </a>
      </Container>
      <Container className='hvr-buzz'>
        <GitSvg />
      </Container>
    </Wrapper>
  </Footer>
);

export default FooterComponent;
