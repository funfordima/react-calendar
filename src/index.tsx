import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './Redux/reducers';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import { Members, Events } from './Redux/interfaces';

// const defaultState = {
//   isLoad: true,
//   eventID: '',
//   currentUser: {} as Members,
//   users: [] as Members[],
//   isUpdate: '',
//   events: [] as Events[],
// };

const store = createStore(reducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
