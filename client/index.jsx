import React       from 'react';
import { render }  from 'react-dom';
import { Router, browserHistory }  from 'react-router';
import routes      from 'routes';
import { createStore, combineReducers } from 'redux';
import { Provider }                     from 'react-redux';
import { fromJS }                       from 'immutable';
import * as reducers                    from 'reducers';

const initialStateMutable = window._initial_redux_state;
const initialState = {};
Object.keys(initialStateMutable).forEach(key => {
  initialState[key] = fromJS(initialStateMutable[key])
})
// const initialState = window._initial_redux_state;

const reducer = combineReducers(reducers);
const store = createStore(reducer, initialState);

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      {routes}
    </Router>
  </Provider>,
  document.getElementById('react-view')
);
