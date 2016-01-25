import React from 'react';
import {
    Route, IndexRoute
}
from 'react-router';

import Framework from './components/Framework.react';

import Dashboard from './components/Dashboard';
import About from './components/About';
import PublishDash from './components/Publish';
import Preferences from './components/Preferences';


import IPFSManagement from './components/Management/ipfs';

export
default (
    <Route path="/" component={Framework}>
      <IndexRoute component={Dashboard}/>

      <Route path="preferences" component={Preferences} />
      <Route path="about" component={About} />
      <Route path="publish/dashboard" component={PublishDash} />
      <Route path="management/ipfs" component={IPFSManagement} />
      
    </Route>
);