import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
// import { createStore } from 'redux';
// import reducer from './Redux/reducers';
import { updateMembers } from './Redux/actions';
// import AppContext from './context/appContext';
import MainPage from './Pages/MainPage/MainPage';
import AddEventPage from './Pages/AddEventPage';
import Data from './utils/data';
import { Members } from './interfaces';
import { MEMBERS, MAIN_URL } from './constants/constants';
import './App.scss';

// const defaultState = {
//   isLoad: true,
//   eventID: '',
//   currentUser: {} as Members,
//   users: [] as Members[],
// };

// const store = createStore(reducer, defaultState);

interface AppProps {
  onFetch: (param: string) => void;
}

const App: React.FC<AppProps> = ({ onFetch }) => {
  // const [setMembers] = useState<Members[]>([]);

  // const appContext = {
  //   members,
  //   setMembers,
  // };

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const response = await new Data(MAIN_URL).getData(MEMBERS);
      const json = await response.json();

      const receivedMembers = JSON.parse((json[json.length - 1]).data);

      localStorage.setItem(MEMBERS, JSON.stringify(receivedMembers));
    };

    fetchData();

    onFetch(MEMBERS);

  }, [onFetch]);

  return (
    // <Provider store={store}>
    // <AppContext.Provider value={appContext}>
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={MainPage} />
        <Route path='/events' component={AddEventPage} />
      </Switch>
    </BrowserRouter>
    // </AppContext.Provider>
    // </Provider>
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
        console.log(json);
        const receivedMembers = JSON.parse((json[json.length - 1]).data);
        dispatch(updateMembers(receivedMembers as Members[]))
      });
    // .catch((err) => dispatch(fetchUpdateError(err)));
  }
});

export default connect(null, mapDispatchToProps)(App);
