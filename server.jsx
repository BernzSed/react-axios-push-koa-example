import express                   from 'express';
import React                     from 'react';
import { renderToString }        from 'react-dom/server'
import { RouterContext, match }  from 'react-router';
import createMemoryHistory       from 'history/lib/createMemoryHistory'
import { createStore, combineReducers } from 'redux';
import { Provider }                     from 'react-redux';
import { applyMiddleware } from 'redux';

import promiseMiddleware   from 'lib/promiseMiddleware';
import routes             from 'routes';
import * as reducers      from 'reducers';



const app = express();

app.use((req, res) => {
  console.log(req.originalUrl, typeof(req.originalUrl))
  const reducer = combineReducers(reducers);
  const store = createStore(reducer, applyMiddleware(promiseMiddleware));
  const history = createMemoryHistory(req.originalUrl)

  match({ routes, location: req.originalUrl, history }, (err, redirectLocation, renderProps) => {
    console.log('matching');

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
          <script type="application/javascript" src="/bundle.js"></script>
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
        console.log('subscribe callback');
        if(notLoading()) {
          unsubscribe();
          renderAndRespond();
        }
      });

    }
  });
});
export default app;
