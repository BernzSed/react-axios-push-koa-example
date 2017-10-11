import React from 'react';
import ReactDOM  from 'react-dom';
import App from 'components';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { fromJS } from 'immutable';
import * as reducers from 'reducers';
import { applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import axiosConfig from 'config/axios';

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
