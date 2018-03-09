import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import Header from './components/Containers/Header';
import Landing from './components/Containers/Landing';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Header />
          <Landing />
        </div>
      </Router>
    );
  }
}

export default App;
