import http2 from 'http2';
import React from 'react';
import { renderToString } from 'react-dom/server'
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { applyMiddleware } from 'redux';
import * as fs from 'fs';
import Koa from 'koa';
import Router from 'koa-router';
import mount from 'koa-mount';
import serve from 'koa-static';
import thunk from 'redux-thunk';

import AppComponent from 'components';
import * as reducers from 'reducers';
import api from './api';
// import prepareAxios from 'axios-isomorphic-push'; // TODO use this. Also, maybe rename 'prepareAxios' to 'createAxios'
import axios from 'axios'; // TODO don't; use axios-isomorphic-push instead

const options = {
  key: fs.readFileSync('./server.key'),
  cert: fs.readFileSync('./server.crt')
};
const app = new Koa();

const server = http2.createSecureServer(options, app.callback());

server.listen(3000, (err) => {
  if (err) {
    throw new Error(err);
  }

  console.log('Listening on port: ' + 3000 + '.');
});

const routes = new Router();
app.use(routes.routes());

routes.use(api.routes());
routes.use(mount('/assets', serve('assets')))

routes.get(/^\/(.*)(?:\/|$)/, async function(ctx, next) {
  const { req, res } = ctx;

  // const apiClient = prepareAxios(res); // TODO
  const apiClient = axios.create();
  const reducer = combineReducers(reducers);
  const middlewares = applyMiddleware(thunk.withExtraArgument(apiClient));
  const store = createStore(reducer, middlewares);

  const InitialComponent = (
    <Provider store={store}>
      <AppComponent/>
    </Provider>
  );

  const componentHTML = renderToString(InitialComponent);

  const initialState = store.getState();

  const html = `
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
      <script defer async type="application/javascript" src="/assets/bundle.js"></script>
    </body>
  </html>
  `;

  ctx.body = html;
});

export default server;
