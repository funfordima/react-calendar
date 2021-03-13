import styled from 'styled-components';

const Container = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  row-gap: 1.5rem;

  @media (max-width: 1000px) {
    width: 60%;
  }

  @media (max-width: 767px) {
    width: 70%;
  }

  @media (max-width: 601px) {
    width: 80%;
  }
`;

export default Container;
