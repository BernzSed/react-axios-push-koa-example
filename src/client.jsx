import React from 'react';
import ReactDOM  from 'react-dom';
import { applyMiddleware, compose, combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import { fromJS } from 'immutable';
import thunk from 'redux-thunk';
import axios from 'axios';
import * as reducers from './reducers';
import App from './components';
import axiosConfig from './config/axios';

const initialStateMutable = window._initial_redux_state;
const initialState = {};
Object.keys(initialStateMutable).forEach(key => {
  initialState[key] = fromJS(initialStateMutable[key])
});

const apiClient = axios.create(axiosConfig);
const reducer = combineReducers(reducers);
const middlewares = applyMiddleware(thunk.withExtraArgument(apiClient));
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancers(middlewares));

ReactDOM.hydrate(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('react-view')
);
