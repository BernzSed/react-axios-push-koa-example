import express                   from 'express';
import React                     from 'react';
import { renderToString }        from 'react-dom/server'
import { RouterContext, match } from 'react-router';
import createLocation            from 'history/lib/createLocation';
import { createStore, combineReducers } from 'redux';
import { Provider }                     from 'react-redux';
import { applyMiddleware } from 'redux';
import promiseMiddleware   from 'lib/promiseMiddleware';

import routes             from 'routes';
import * as reducers      from 'reducers';


const app = express();

app.use((req, res) => {
  const location = createLocation(req.url);
  const reducer  = combineReducers(reducers);
  const store = createStore(reducer, applyMiddleware(promiseMiddleware));

  match({ routes, location }, (err, redirectLocation, renderProps) => {

    if (err) {
      console.error(err);
      return res.status(500).end('Internal server error');
    }

    if (!renderProps) return res.status(404).end('Not found.');

    const InitialComponent = (
      <Provider store={store}>
        <RouterContext {...renderProps} />
      </Provider>
    );

    renderToString(InitialComponent); // Hackish solution; should find a fix for that

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
        if(notLoading()){
          renderAndRespond();
          if(unsubscribe) unsubscribe();
        }
      });

    }
  });
});
export default app;
