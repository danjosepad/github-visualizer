import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom'

import HomePage from './pages/Home';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={HomePage} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes