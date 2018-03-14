import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import Landing from './components/Containers/Landing';
import NewsFeed from './components/Containers/NewsFeed';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
        <Route exact path="/" component={Landing} />
        <Route path="/feed" component={NewsFeed} />
        </div>
      </Router>
    );
  }
}

export default App;
