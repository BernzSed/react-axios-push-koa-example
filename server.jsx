import express                   from 'express';
import React                     from 'react';
import { renderToString }        from 'react-dom/server'
import { RouterContext, match }  from 'react-router';
import createMemoryHistory       from 'history/lib/createMemoryHistory'
// import createMemoryHistory from 'history/createMemoryHistory'
import { createStore, combineReducers } from 'redux';
import { Provider }                     from 'react-redux';
import { applyMiddleware }      from 'redux';
import spdy                from 'spdy';
import * as fs from 'fs';
import thunk from 'redux-thunk'

import promiseMiddleware   from 'lib/promiseMiddleware';
import routes             from 'routes';
import * as reducers      from 'reducers';
import api from './api/routes'
import prepareAxios from 'axios-isomorphic-push'

const options = {
  key: fs.readFileSync('./server.key'),
  cert: fs.readFileSync('./server.crt')
};
const app = express();


app.use('/api', api);

app.use('/assets', express.static('assets'));

app.use((req, res) => {
  const axios = prepareAxios(res);
  const reducer = combineReducers(reducers);
  const middlewares = applyMiddleware(thunk.withExtraArgument(axios), promiseMiddleware);
  const store = createStore(reducer, middlewares);
  const history = createMemoryHistory(req.originalUrl);


  axios.interceptors.request.use(
    config => {
      global.console.log('server - request intercepted', config)
      return config;
    },
    err => global.console.log('server - request error', err));

    axios.interceptors.response.use(
      response => {
        global.console.log('server - response intercepted', response);
        return response;
      },
      err => global.console.log('server - response error', err));


  const fooPromise = axios.get('https://localhost:3000/api/foo');
  fooPromise.then(foo => global.console.log('got foo', foo), err => global.console.log('could not get foo', err));


  match({ routes, location: req.originalUrl, history }, (err, redirectLocation, renderProps) => {
    if (err) {
      console.error(err);
      return res.status(500).end('Internal server error');
    } else if (redirectLocation) {
      return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    }

    if (!renderProps) return res.status(404).end('Not found.');

    const InitialComponent = (
      <Provider store={store}>
        <RouterContext {...renderProps} />
      </Provider>
    );

    renderToString(InitialComponent);


    function renderAndRespond() {
      const componentHTML = renderToString(InitialComponent);
      const initialState = store.getState();

      global.console.log('renderAndRespond, rendered to string');

      const HTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Page Title</title>
          <script type="application/javascript">
            window._initial_redux_state = ${JSON.stringify(initialState)};
          </script>
        </head>
        <body>
          <div id="react-view">${componentHTML}</div>
          <script type="application/javascript" src="/assets/bundle.js"></script>
        </body>
      </html>
      `;

      res.end(HTML);
    }

    function notLoading() {
      if(store.getState()['loading'].pending === 0) {
        return true;
      } else {
        return false;
      }
    }

    if(notLoading()) {
      renderAndRespond();
    } else {
      // TODO add a timeout, just in case

      const unsubscribe = store.subscribe(function() {
        // console.log('subscribe callback');
        if(notLoading()) {
          unsubscribe();
          renderAndRespond();
        }
      });

    }
  });
});
const server = spdy.createServer(options, app);

export default server;
