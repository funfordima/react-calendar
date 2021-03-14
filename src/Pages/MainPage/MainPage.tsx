import React, { useState, useEffect } from 'react';
import MainContext from '../../context/mainContext';
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
  const [members, setMembers] = useState<string[]>([]);

  const mainContext = {
    events,
    members,
    isLoading,
  };

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const response = await new Data(MAIN_URL).getData(EVENTS);
      const json = await response.json();

      const receivedEvents = JSON.parse((json[json.length - 1]).data);

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

      const mapMembers = receivedMembers.map(({ name }: Members) => name);
      setMembers(mapMembers);
    };

    fetchData();
  }, []);

  return (
    <MainContext.Provider value={mainContext}>
      <HeaderComponent />
      <ControlButtonPanel />
      <Main />
      <FooterComponent />
    </MainContext.Provider>
  );
};

export default MainPage;


