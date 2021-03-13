import React from 'react';
import styled from 'styled-components';
import GenerateItems from './GenerateItems/GenerateItems';
import MainContent from './MainContent/MainContent';

const MainContainer = styled.main`
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
  const events = [
    { "id": Date.now().toString(), "title": "", "participants": [], "day": "", "time": "", "complete": false, "dataCol": 0, "dataRow": 0 },
    { "id": Date.now().toString(), "title": "", "participants": [], "day": "", "time": "", "complete": false, "dataCol": 1, "dataRow": 0 },
    { "id": Date.now().toString(), "title": "", "participants": [], "day": "", "time": "", "complete": false, "dataCol": 2, "dataRow": 0 },
    { "id": Date.now().toString(), "title": "", "participants": [], "day": "", "time": "", "complete": false, "dataCol": 3, "dataRow": 0 },
    { "id": Date.now().toString(), "title": "", "participants": [], "day": "", "time": "", "complete": false, "dataCol": 4, "dataRow": 0 },
    { "id": Date.now().toString(), "title": "", "participants": [], "day": "", "time": "", "complete": false, "dataCol": 0, "dataRow": 1 },
    { "id": Date.now().toString(), "title": "Relax", "participants": ["Ivan"], "day": "Mon", "time": "17:00", "complete": true, "dataCol": 1, "dataRow": 1 },
    { "id": Date.now().toString(), "title": "", "participants": [], "day": "", "time": "", "complete": false, "dataCol": 2, "dataRow": 1 },
    { "id": Date.now().toString(), "title": "", "participants": [], "day": "", "time": "", "complete": false, "dataCol": 3, "dataRow": 1 },
    { "id": Date.now().toString(), "title": "", "participants": [], "day": "", "time": "", "complete": false, "dataCol": 4, "dataRow": 1 },
    { "id": Date.now().toString(), "title": "", "participants": [], "day": "", "time": "", "complete": false, "dataCol": 0, "dataRow": 2 },
    { "id": Date.now().toString(), "title": "", "participants": [], "day": "", "time": "", "complete": false, "dataCol": 1, "dataRow": 2 },
    { "id": Date.now().toString(), "title": "", "participants": [], "day": "", "time": "", "complete": false, "dataCol": 2, "dataRow": 2 },
    { "id": Date.now().toString(), "title": "", "participants": [], "day": "", "time": "", "complete": false, "dataCol": 3, "dataRow": 2 },
    { "id": Date.now().toString(), "title": "", "participants": [], "day": "", "time": "", "complete": false, "dataCol": 4, "dataRow": 2 },
    { "id": Date.now().toString(), "title": "", "participants": [], "day": "", "time": "", "complete": false, "dataCol": 0, "dataRow": 3 },
    { "id": Date.now().toString(), "title": "", "participants": [], "day": "", "time": "", "complete": false, "dataCol": 1, "dataRow": 3 },
    { "id": Date.now().toString(), "title": "", "participants": [], "day": "", "time": "", "complete": false, "dataCol": 2, "dataRow": 3 },
    { "id": Date.now().toString(), "title": "", "participants": [], "day": "", "time": "", "complete": false, "dataCol": 3, "dataRow": 3 },
    { "id": Date.now().toString(), "title": "", "participants": [], "day": "", "time": "", "complete": false, "dataCol": 4, "dataRow": 3 },
    { "id": Date.now().toString(), "title": "", "participants": [], "day": "", "time": "", "complete": false, "dataCol": 0, "dataRow": 4 },
    { "id": Date.now().toString(), "title": "", "participants": [], "day": "", "time": "", "complete": false, "dataCol": 1, "dataRow": 4 },
    { "id": Date.now().toString(), "title": "", "participants": [], "day": "", "time": "", "complete": false, "dataCol": 2, "dataRow": 4 },
    { "id": Date.now().toString(), "title": "Daily StandUp", "participants": ["Tanya"], "day": "Fri", "time": "11:00", "complete": true, "dataCol": 3, "dataRow": 4 },
    { "id": Date.now().toString(), "title": "", "participants": [], "day": "", "time": "", "complete": false, "dataCol": 4, "dataRow": 4 },
    { "id": Date.now().toString(), "title": "", "participants": [], "day": "", "time": "", "complete": false, "dataCol": 0, "dataRow": 5 },
    { "id": Date.now().toString(), "title": "", "participants": [], "day": "", "time": "", "complete": false, "dataCol": 1, "dataRow": 5 },
    { "id": Date.now().toString(), "title": "", "participants": [], "day": "", "time": "", "complete": false, "dataCol": 2, "dataRow": 5 },
    { "id": Date.now().toString(), "title": "", "participants": [], "day": "", "time": "", "complete": false, "dataCol": 3, "dataRow": 5 },
    { "id": Date.now().toString(), "title": "", "participants": [], "day": "", "time": "", "complete": false, "dataCol": 4, "dataRow": 5 },
    { "id": Date.now().toString(), "title": "", "participants": [], "day": "", "time": "", "complete": false, "dataCol": 0, "dataRow": 6 },
    { "id": Date.now().toString(), "title": "", "participants": [], "day": "", "time": "", "complete": false, "dataCol": 1, "dataRow": 6 },
    { "id": Date.now().toString(), "title": "", "participants": [], "day": "", "time": "", "complete": false, "dataCol": 2, "dataRow": 6 },
    { "id": Date.now().toString(), "title": "", "participants": [], "day": "", "time": "", "complete": false, "dataCol": 3, "dataRow": 6 },
    { "id": Date.now().toString(), "title": "", "participants": [], "day": "", "time": "", "complete": false, "dataCol": 4, "dataRow": 6 },
    { "id": Date.now().toString(), "title": "", "participants": [], "day": "", "time": "", "complete": false, "dataCol": 0, "dataRow": 7 },
    { "id": Date.now().toString(), "title": "", "participants": [], "day": "", "time": "", "complete": false, "dataCol": 1, "dataRow": 7 },
    { "id": Date.now().toString(), "title": "", "participants": [], "day": "", "time": "", "complete": false, "dataCol": 2, "dataRow": 7 },
    { "id": Date.now().toString(), "title": "", "participants": [], "day": "", "time": "", "complete": false, "dataCol": 3, "dataRow": 7 },
    { "id": Date.now().toString(), "title": "", "participants": [], "day": "", "time": "", "complete": false, "dataCol": 4, "dataRow": 7 },
    { "id": Date.now().toString(), "title": "", "participants": [], "day": "", "time": "", "complete": false, "dataCol": 0, "dataRow": 8 },
    { "id": Date.now().toString(), "title": "", "participants": [], "day": "", "time": "", "complete": false, "dataCol": 1, "dataRow": 8 },
    { "id": Date.now().toString(), "title": "", "participants": [], "day": "", "time": "", "complete": false, "dataCol": 2, "dataRow": 8 },
    { "id": Date.now().toString(), "title": "", "participants": [], "day": "", "time": "", "complete": false, "dataCol": 3, "dataRow": 8 },
    { "id": Date.now().toString(), "title": "FE Team Sync", "participants": ["Maria"], "day": "Tue", "time": "14:00", "complete": true, "dataCol": 4, "dataRow": 8 }
  ];

  return (
    <MainContainer>
      <RowContainer>
        <GenerateItems data={['Name', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri']} />
      </RowContainer>
      <ColContainer>
        <GenerateItems data={['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00']} />
      </ColContainer>
      <ContentContainer>
        <MainContent events={events} />
      </ContentContainer>
    </MainContainer>
  );
};

export default Main;
