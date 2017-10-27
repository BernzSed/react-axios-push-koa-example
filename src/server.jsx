import http2 from 'http2';
import { PassThrough } from 'stream';
import React from 'react';
import { renderToNodeStream } from 'react-dom/server'
import * as fs from 'fs';
import Koa from 'koa';
import Router from 'koa-router';
import mount from 'koa-mount';
import serve from 'koa-static';

import AppComponent from './components';
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
app.use(mount('/assets', serve('assets')));

routes.get('/', async function(ctx) {
  const onSafeToEnd = () => {
    // TODO
  }

  const InitialComponent = (
    <AxiosProvider axios={axiosConfig} req={ctx.request} onSafeToEnd={onSafeToEnd}>
      <AppComponent />
    </AxiosProvider>
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
    const html2 = `</div>
    <script defer async type="application/javascript" src="/assets/bundle.js"></script>
  </body>
</html>`;
    // onSafeToEnd() is needed if you're chaining api calls
    ctx.body.write(html2);
    ctx.body.end();
  });
});

export default server;
