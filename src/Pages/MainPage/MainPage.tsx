import React from 'react';
import HeaderComponent from '../../Components/Header/Header';
import ControlButtonPanel from '../../Components/ControlButtonPanel/ControlButtonPanel';
import Main from '../../Components/Main/Main';

const MainPage: React.FC = () => (
  <>
    <HeaderComponent />
    <ControlButtonPanel />
    <Main />
  </>
);

export default MainPage;


