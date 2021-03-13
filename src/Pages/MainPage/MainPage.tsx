import React from 'react';
import HeaderComponent from '../../Components/Header/Header';
import ControlButtonPanel from '../../Components/ControlButtonPanel/ControlButtonPanel';
import Main from '../../Components/Main/Main';
import FooterComponent from '../../Components/Footer/Footer';

const MainPage: React.FC = () => (
  <>
    <HeaderComponent />
    <ControlButtonPanel />
    <Main />
    <FooterComponent />
  </>
);

export default MainPage;


