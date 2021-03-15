import React, { useState, useEffect } from 'react';
import MainContext from '../../context/mainContext';
import AuthorizationPage from '../AuthorizationPage';
import HeaderComponent from '../../Components/Header/Header';
import ControlButtonPanel from '../../Components/ControlButtonPanel/ControlButtonPanel';
import Main from '../../Components/Main/Main';
import FooterComponent from '../../Components/Footer/Footer';
import Data from '../../utils/data';
import { EVENTS, MAIN_URL, MEMBERS } from '../../constants/constants';
import { Events, Members } from '../../interfaces';

const MainPage: React.FC = () => {
  const [events, setEvents] = useState<Events[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [members, setMembers] = useState<Members[]>([]);
  const [idEvent, setIdEvent] = useState('');
  const [user, setUser] = useState({} as Members);

  const mainContext = {
    events,
    members,
    isLoading,
    setMembers,
    idEvent,
    setEvents,
    setUser,
    user,
  };

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const response = await new Data(MAIN_URL).getData(EVENTS);
      const json = await response.json();

      const receivedEvents = JSON.parse((json[json.length - 1]).data);
      const { id } = (json[json.length - 1]);

      setIdEvent(id);

      localStorage.setItem(EVENTS, JSON.stringify(receivedEvents));
      setEvents(receivedEvents as unknown as Events[]);
      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const response = await new Data(MAIN_URL).getData(MEMBERS);
      const json = await response.json();

      const receivedMembers = JSON.parse((json[json.length - 1]).data);

      localStorage.setItem(MEMBERS, JSON.stringify(receivedMembers));

      setMembers(receivedMembers);
    };

    fetchData();
  }, []);

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

export default MainPage;


