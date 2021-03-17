import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './Redux/reducers';
import AppContext from './context/appContext';
import MainPage from './Pages/MainPage/MainPage';
import AddEventPage from './Pages/AddEventPage';
import Data from './utils/data';
import { Members } from './interfaces';
import { MEMBERS, MAIN_URL } from './constants/constants';
import './App.scss';

const defaultState = {
  isLoad: true,
  eventID: '',
  currentUser: {} as Members,
};

const store = createStore(reducer, defaultState);

const App: React.FC = () => {
  const [members, setMembers] = useState<Members[]>([]);

  const appContext = {
    members,
    setMembers,
  };

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
    <Provider store={store}>
      <AppContext.Provider value={appContext}>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={MainPage} />
            <Route path='/events' component={AddEventPage} />
          </Switch>
        </BrowserRouter>
      </AppContext.Provider>
    </Provider>
  );
};

export default App;
