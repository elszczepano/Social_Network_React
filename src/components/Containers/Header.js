import React, { Component } from 'react';
import Login from '../Control/Login';
import UserPanel from '../Control/UserPanel';
import '../../assets/scss/main.scss';
import '../../assets/scss/header/header.scss';

class Header extends Component {

  constructor(props) {
      super(props);
      this.state = {isLogged: false};
  }

  render() {
    return (
        <header className="main-header">
            <div className="logo">
              <h1>Groupeé</h1>
            </div>
            { this.state.isLogged ? <UserPanel /> : <Login /> }
        </header>
    );
  }
}

export default Header;
