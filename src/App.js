import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import Landing from './components/Containers/Landing';
import NewsFeed from './components/Containers/NewsFeed';
import CreateGroup from './components/Control/CreateGroup';
import Group from './components/View/Group';
import MyAccount from './components/Control/MyAccount';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
        <Route exact path="/" component={Landing} />
        <Route path="/feed" component={NewsFeed} />
        <Route path="/group/create" component={CreateGroup} />
        <Route path="/my-account" component={MyAccount} />
        <Route path="/group/:id" component={Group} />
        </div>
      </Router>
    );
  }
}

export default App;
