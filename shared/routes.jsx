import React     from 'react';
import { Route, IndexRoute } from 'react-router';

import App from 'components';
import Home from 'components/home';


export default (
  <Route name='app' component={App} path='/'>
    <IndexRoute component={Home}/>
  </Route>
);
