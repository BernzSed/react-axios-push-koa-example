import http2 from 'http2';
import { PassThrough } from 'stream';
import React from 'react';
import { renderToNodeStream } from 'react-dom/server'
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { applyMiddleware } from 'redux';
import * as fs from 'fs';
import Koa from 'koa';
import Router from 'koa-router';
import mount from 'koa-mount';
import serve from 'koa-static';
import thunk from 'redux-thunk';
import createAxios from 'axios-push';

import AppComponent from './components';
import * as reducers from './reducers';
import api from './api';
import axiosConfig from './config/axios';

const options = {
  key: fs.readFileSync('./server.key'),
  cert: fs.readFileSync('./server.crt'),
  allowHTTP1: true
};
const app = new Koa();

const server = http2.createSecureServer(options, app.callback());

const routes = new Router();
app.use(routes.routes());

routes.use(api.routes());
routes.use('/assets', mount('/assets', serve('assets')))

routes.get(/^\/(.*)(?:\/|$)/, async function(ctx, next) {
  const apiClient = createAxios(ctx.res, axiosConfig);
  const reducer = combineReducers(reducers);
  const middlewares = applyMiddleware(thunk.withExtraArgument(apiClient));
  const store = createStore(reducer, middlewares);

  const InitialComponent = (
    <Provider store={store}>
      <AppComponent/>
    </Provider>
  );

  ctx.status = 200;
  ctx.type = 'text/html';
  ctx.body = new PassThrough();

  const html1 = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Page Title</title>
  </head>
  <body>
    <div id="react-view">`;
  ctx.body.write(html1);
  const stream = renderToNodeStream(InitialComponent);
  stream.pipe(ctx.body, {end: false});
  stream.on('end', () => {
    // wait until the stream ends to get redux state
    const initialState = store.getState();
    const html2 = `</div>
    <script type="application/javascript">
      window._initial_redux_state = ${JSON.stringify(initialState)};
    </script>
    <script defer async type="application/javascript" src="/assets/bundle.js"></script>
  </body>
</html>`;
    ctx.body.end(html2);
  });
});

export default server;
