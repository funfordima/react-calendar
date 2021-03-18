import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateMembers } from './Redux/actions';
import MainPage from './Pages/MainPage/MainPage';
import AddEventPage from './Pages/AddEventPage';
import Data from './utils/data';
import { Members } from './interfaces';
import { MEMBERS, MAIN_URL } from './constants/constants';
import './App.scss';

interface AppProps {
  onFetch: (param: string) => void;
}

const App: React.FC<AppProps> = ({ onFetch }) => {

  useEffect(() => {
    onFetch(MEMBERS);
  }, [onFetch]);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={MainPage} />
        <Route path='/events' component={AddEventPage} />
      </Switch>
    </BrowserRouter>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  onFetch: (param: string) => {
    new Data(MAIN_URL).getData(param)
      .then(res => {
        if (!res.ok) {
          throw new Error('something was wrong')
        }
        return res.json();
      })
      .then((json) => {
        const receivedMembers = JSON.parse((json[json.length - 1]).data);
        localStorage.setItem(MEMBERS, JSON.stringify(receivedMembers));
        dispatch(updateMembers(receivedMembers as Members[]))
      });
    // .catch((err) => dispatch(fetchUpdateError(err)));
  }
});

export default connect(null, mapDispatchToProps)(App);
