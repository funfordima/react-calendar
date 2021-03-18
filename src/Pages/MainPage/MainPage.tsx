import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { updateLoading, updateEventID, updateEvents, fetchUpdateError } from '../../Redux/actions';
import AuthorizationPage from '../AuthorizationPage';
import HeaderComponent from '../../Components/Header/Header';
import ControlButtonPanel from '../../Components/ControlButtonPanel/ControlButtonPanel';
import Main from '../../Components/Main/Main';
import FooterComponent from '../../Components/Footer/Footer';
import Data from '../../utils/data';
import { EVENTS, MAIN_URL } from '../../constants/constants';
import { Events } from '../../interfaces';
import {
  State,
  Members,
} from '../../Redux/interfaces';

interface MainPageProps {
  user: Members;
  onFetch: (param: string) => void;
}

const MainPage: React.FC<MainPageProps> = ({ user, onFetch }) => {

  useEffect(() => {
    onFetch(EVENTS);
  }, [onFetch]);

  return (
    <>
      {
        user.name
          ? <>
            <HeaderComponent />
            <ControlButtonPanel />
            <Main />
            <FooterComponent />
          </>
          : <AuthorizationPage />
      }
    </>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  updateLoad: (val: boolean) => dispatch(updateLoading(val)),
  updateID: (id: string) => dispatch(updateEventID(id)),
  onFetch: (param: string) => {
    new Data(MAIN_URL).getData(param)
      .then(res => {
        if (!res.ok) {
          throw new Error('something was wrong')
        }
        return res.json();
      })
      .then((json) => {
        const receivedEvents = JSON.parse((json[json.length - 1]).data);
        localStorage.setItem(EVENTS, JSON.stringify(receivedEvents));
        const { id } = (json[json.length - 1]);

        dispatch(updateEventID(id));
        dispatch(updateLoading(false));
        dispatch(updateEvents(receivedEvents as Events[]))
      })
      .catch((e) => dispatch(fetchUpdateError(e.message)));
  }
});

const mapStateToProps = (state: State) => ({
  user: state.currentUser,
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);


