import React from 'react';
import styled from 'styled-components';
import { MainItem } from '../../styledComponents';
import { Events } from '../../../interfaces';

const Title = styled.h3`
  display: none;
  font-size: 2rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 1000px) {
    font-size: 1.5rem;
  }

  @media (max-width: 601px) {
    font-size: 1.2rem;
    text-align: center;
  }
`;

const BtnClose = styled.div`
  display: none;
  position: absolute;
  right: 5px;
  top: -2px;

  &:hover {
    transform: scale(1.1);
  }
`;

interface MainContentProps {
  events: Events[];
}

const MainContent: React.FC<MainContentProps> = ({ events }) => (
  <>
    {events.map(({
      title,
      complete,
      day,
      time,
      participants,
    }) => (
      <div key={day + time}>
        <MainItem
          data-complete={complete}
          data-day={day}
          data-time={time}
          title={participants.join(' ')}
          draggable={complete}
        >
          <Title>
            {title}
          </Title>
          <BtnClose tab-index='0'>
            ×
          </BtnClose>
        </MainItem>
      </div>
    ))}
  </>
);

export default MainContent;
