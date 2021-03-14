import React, { useContext } from 'react';
import styled from 'styled-components';
import MainContext from '../../context/mainContext'
import Loader from '../Loader';
import GenerateItems from './GenerateItems/GenerateItems';
import MainContent from './MainContent/MainContent';
import { dayLabel, timeLabel } from '../../constants/constants';

const MainContainer = styled.main`
  margin: 5rem 0;
  width: 100%;
  height: 50rem;
  display: flex;
  flex-wrap: wrap;
  background-color: #c8c8c8;
  border: 1px solid #eee;

  @media (max-width: 601px) {
    height: 40rem;
  }
`;

const RowContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: calc(10% - 1px) repeat(5, 1fr);
  row-gap: 2px;
  column-gap: 2px;
  width: 100%;
  height: 6rem;
  background-color: #c7c7c7;
  border: 2px solid #c7c7c7;

  @media (max-width: 601px) {
    height: 5rem;
  }

  @media (max-width: 530px) {
    height: 4rem;
  }

  & div {
    background-color: #e5e5e5;
  }
`;

const ColContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(9, 1fr);
  grid-template-columns: 1fr;
  row-gap: 2px;
  column-gap: 2px;
  width: 10%;
  height: calc(100% - 6rem);
  background-color: #e5e5e5;
  border: 2px solid #c7c7c7;
  border-right: 0;

  @media (max-width: 601px) {
    height: calc(100% - 5rem);
  }

  @media (max-width: 530px) {
    height: calc(100% - 4rem);
  }
`;

const ContentContainer = styled.div`
  width: 90%;
  height: calc(100% - 6rem);
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(9, 1fr);
  row-gap: 2px;
  column-gap: 2px;
  background-color: #e5e5e5;
  border: 2px solid #c7c7c7;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 601px) {
    height: calc(100% - 5rem);
  }

  @media (max-width: 530px) {
    height: calc(100% - 4rem);
  }
`;

const Main: React.FC = () => {
  const { events, isLoading } = useContext(MainContext);

  return (
    <>
      {isLoading
        ? <Loader />
        : <MainContainer>
          <RowContainer>
            <GenerateItems data={dayLabel} />
          </RowContainer>
          <ColContainer>
            <GenerateItems data={timeLabel} />
          </ColContainer>
          <ContentContainer>
            <MainContent events={events} />
          </ContentContainer>
        </MainContainer>
      }
    </>
  );
};

export default Main;
