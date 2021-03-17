import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { updateLoading, updateEventID } from '../../Redux/actions';
import MainContext from '../../context/mainContext';
import AuthorizationPage from '../AuthorizationPage';
import HeaderComponent from '../../Components/Header/Header';
import ControlButtonPanel from '../../Components/ControlButtonPanel/ControlButtonPanel';
import Main from '../../Components/Main/Main';
import FooterComponent from '../../Components/Footer/Footer';
import Data from '../../utils/data';
import { EVENTS, MAIN_URL } from '../../constants/constants';
import { Events } from '../../interfaces';
import { UpdateLoading, UpdateEventID, State, Members } from '../../Redux/interfaces';

interface MainPageProps {
  updateLoad: (value: boolean) => UpdateLoading;
  updateID: (value: string) => UpdateEventID;
  user: Members;
}

const MainPage: React.FC<MainPageProps> = ({ updateLoad, updateID, user }) => {
  const [events, setEvents] = useState<Events[]>([]);

  const mainContext = {
    events,
    setEvents,
  };

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const response = await new Data(MAIN_URL).getData(EVENTS);
      const json = await response.json();

      const receivedEvents = JSON.parse((json[json.length - 1]).data);
      const { id } = (json[json.length - 1]);

      updateID(id);

      localStorage.setItem(EVENTS, JSON.stringify(receivedEvents));
      setEvents(receivedEvents as unknown as Events[]);
      updateLoad(false);
    };

    fetchData();
  }, [updateLoad, updateID]);

  return (
    <MainContext.Provider value={mainContext}>
      {user.name
        ? <>
          <HeaderComponent />
          <ControlButtonPanel />
          <Main />
          <FooterComponent />
        </>
        : <AuthorizationPage />
      }

    </MainContext.Provider>
  );
};

const mapDispatchToProps = {
  updateLoad: updateLoading,
  updateID: updateEventID,
};

const mapStateToProps = (state: State) => ({
  user: state.currentUser,
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);


