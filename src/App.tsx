import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainPage from './Pages/MainPage/MainPage';
import './App.scss';

const App: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path='/' component={MainPage} />
    </Switch>
  </BrowserRouter>
);

export default App;
