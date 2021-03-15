import React from 'react';
import styled from 'styled-components';
import { MainItem } from '../../styledComponents';
import { Events } from '../../../interfaces';
import { EVENTS } from '../../../constants/constants';

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

const DelEventBtn = styled.div`
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
  deleteEvent: (eventName: string) => void;
  getEventData: (data: Events[]) => void;
}

const MainContent: React.FC<MainContentProps> = ({ events, deleteEvent, getEventData }) => {
  const handleClickDelBtn = ({ target }: React.MouseEvent<HTMLDivElement>): void => {
    const eventName = (target as HTMLDivElement).getAttribute('data-title');
    const eventTime = (target as HTMLDivElement).getAttribute('data-time');
    const eventDay = (target as HTMLDivElement).getAttribute('data-day');

    deleteEvent(eventName as string);

    const newEvent = {
      id: `f${(+new Date()).toString(16)}`,
      title: '',
      participants: [''],
      day: eventDay,
      time: eventTime,
      complete: false,
    };

    const evnts = JSON.parse(String(localStorage.getItem(EVENTS)));
    const newEvents = evnts.map((event: Events) => {
      const { time, day } = event;
      if (time === eventTime && day === eventDay) {
        return newEvent;
      }

      return event;
    });

    getEventData(newEvents);
  };

  return (
    <>
      {events.map(({
        id,
        title,
        complete,
        day,
        time,
        participants,
      }) => (
        <div key={id}>
          <MainItem
            data-key={id}
            data-complete={complete}
            data-day={day}
            data-time={time}
            title={participants.join(' ')}
            draggable={complete}
          >
            <Title>
              {title}
            </Title>
            <DelEventBtn
              tab-index='0'
              data-day={day}
              data-time={time}
              data-title={title}
              onClick={handleClickDelBtn}
            >
              ×
          </DelEventBtn>
          </MainItem>
        </div>
      ))}
    </>
  );
};

export default MainContent;
