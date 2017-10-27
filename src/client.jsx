import 'babel-polyfill';
import React from 'react';
import ReactDOM  from 'react-dom';
import { AxiosProvider } from 'react-axios-push';
import App from './components';
import axiosConfig from './config/axios';

ReactDOM.hydrate(
  <AxiosProvider axios={axiosConfig}>
    <App />
  </AxiosProvider>,
  document.getElementById('react-view')
);
