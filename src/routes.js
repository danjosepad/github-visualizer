import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom'

import HomePage from './pages/Home';
import RepositoryPage from './pages/Repository';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/:repository" component={RepositoryPage} />
        <Route path="/" exact component={HomePage} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes