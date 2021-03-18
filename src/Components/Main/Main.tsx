import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Loader from '../Loader';
import GenerateItems from './GenerateItems/GenerateItems';
import MainContent from './MainContent/MainContent';
import ModalDialog from '../ModalDialog';
import DeleteEventComponent from '../DeleteEventComponent';
import { dayLabel, timeLabel, MAIN_URL, EVENTS, message } from '../../constants/constants';
import { AlertSuccess } from '../styledComponents';
import { Events, State } from '../../Redux/interfaces';
import Data from '../../utils/data';
import { updateEvents, fetchUpdateSuccess } from '../../Redux/actions';

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

interface MainProps {
  isLoad: boolean;
  eventID: string;
  events: Events[];
  onFetch: (param: string, data: Events[], id: string) => void;
  isUpdate: string;
}

const Main: React.FC<MainProps> = ({ isLoad, eventID, events, onFetch, isUpdate }) => {
  const [isShow, setShow] = useState(false);
  const [delEvent, setDelEvent] = useState('');
  const [eventData, setEventData] = useState<Events[] | []>([]);
  // const [isShowAlert, setShowAlert] = useState('');

  const handlerClickBtnDelEvent = (eventName: string): void => {
    setShow(true);
    setDelEvent(eventName);
  };

  const handleCloseModal = (): void => {
    setShow(false);
  };

  const getEventData = (data: Events[]): void => {
    setEventData(data);
  };

  const handlerConfirmDeleteEvent = (): void => {
    onFetch(EVENTS, eventData, eventID);
    // .then(() => {

    //   setTimeout(() => {
    //     setEvents(eventData);
    //   }, 1000);
    // })
    // .catch((err) => {
    //   setShowAlert(err.message);
    // });
  };

  if (isUpdate) {
    setTimeout(() => {
      handleCloseModal();
    }, 2000);
  }

  return (
    <>
      {isLoad
        ? <Loader />
        : <MainContainer>
          <RowContainer>
            <GenerateItems data={dayLabel} />
          </RowContainer>
          <ColContainer>
            <GenerateItems data={timeLabel} />
          </ColContainer>
          <ContentContainer>
            <MainContent
              events={events}
              deleteEvent={handlerClickBtnDelEvent}
              getEventData={getEventData}
            />
          </ContentContainer>
          {isShow
            && <ModalDialog >
              <DeleteEventComponent
                eventTitle={delEvent}
                handleCloseModal={handleCloseModal}
                handlerConfirmDeleteEvent={handlerConfirmDeleteEvent}
              />
              {/* {isShowAlert
                &&
                <AlertError>
                  {isShowAlert}
                </AlertError>
              } */}
              {isUpdate
                &&
                <AlertSuccess>
                  {isUpdate}
                </AlertSuccess>
              }
            </ModalDialog>
          }
        </MainContainer>
      }
    </>
  );
};

const mapStateToProps = (state: State) => ({
  isLoad: state.isLoad,
  eventID: state.eventID,
  events: state.events,
  isUpdate: state.isUpdate,
});

const mapDispatchToProps = (dispatch: any) => ({
  onFetch: (param: string, data: Events[], id: string) => {
    new Data(MAIN_URL).putData(param, data, id)
      .then(res => {
        if (!res.ok) {
          throw new Error('something was wrong')
        }
        return res.json();
      })
      .then((json) => {
        const receivedEvents = JSON.parse(json.data);
        dispatch(updateEvents(receivedEvents as Events[]))
      })
      .then(() => dispatch(fetchUpdateSuccess(message.success)))
      .then(() => {
        setTimeout(() => dispatch(fetchUpdateSuccess('')), 2100);
      });
    // .catch((err) => dispatch(fetchUpdateError(err)));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
