import App from './App';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom/client';

import reportWebVitals from './reportWebVitals';
import { configureStore } from '@reduxjs/toolkit';
import settingReducer from './app/utilities/setting/reducers';

import './index.css';
import "./assets/scss/hope-ui.scss";
import "./assets/scss/custom.scss";
import "./assets/scss/dark.scss";
import "./assets/scss/rtl.scss";
import "./assets/scss/customizer.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";
import 'react-toastify/dist/ReactToastify.css';
import 'react-datepicker/dist/react-datepicker.css';




const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const store = configureStore({
  reducer: {
    setting: settingReducer
  }
});
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
