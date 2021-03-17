import React, { useContext, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import MainContext from '../../context/mainContext'
import Loader from '../Loader';
import GenerateItems from './GenerateItems/GenerateItems';
import MainContent from './MainContent/MainContent';
import ModalDialog from '../ModalDialog';
import DeleteEventComponent from '../DeleteEventComponent';
import { dayLabel, timeLabel, message, MAIN_URL, EVENTS } from '../../constants/constants';
import { AlertError, AlertSuccess } from '../styledComponents';
import { Events } from '../../interfaces';
import Data from '../../utils/data';

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
}

const Main: React.FC<MainProps> = ({ isLoad }) => {
  const { events, isLoading } = useContext(MainContext);
  const [isShow, setShow] = useState(false);
  const [delEvent, setDelEvent] = useState('');
  const [eventData, setEventData] = useState<Events[] | []>([]);
  const { setEvents } = useContext(MainContext);
  const [isShowAlert, setShowAlert] = useState('');
  const [isShowSuccess, setShowSuccess] = useState('');

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
    const { success } = message;

    // new Data(MAIN_URL).putData(EVENTS, eventData, idEvent)
    new Data(MAIN_URL).sendData(EVENTS, eventData)
      .then(() => {
        setShowSuccess(success);

        setTimeout(() => {
          setShowSuccess('');
          setEvents(eventData);
          handleCloseModal();
        }, 1000);
      })
      .catch((err) => {
        setShowAlert(err.message);
      });
  };

  return (
    <>
      {(isLoading && isLoad)
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
              {isShowAlert
                &&
                <AlertError>
                  {isShowAlert}
                </AlertError>
              }
              {isShowSuccess
                &&
                <AlertSuccess>
                  {isShowSuccess}
                </AlertSuccess>
              }
            </ModalDialog>
          }
        </MainContainer>
      }
    </>
  );
};

const mapStateToProps = (state: any) => ({
  isLoad: state.isLoad,
});

export default connect(mapStateToProps)(Main);
