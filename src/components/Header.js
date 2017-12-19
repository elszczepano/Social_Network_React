import React, { Component } from 'react';
import '../assets/scss/main.scss';
import '../assets/scss/header.scss';

class Header extends Component {
  render() {
    return (
        <header className="main-page-header">
          <div className="logo">
            <h1>Groupeé</h1>
          </div>
          <div>
            <ul className="user-icons">
              <li><span className="fa fa-user" aria-hidden="true"></span></li>
              <li><span className="fa fa-comments active" aria-hidden="true"></span></li>
              <li><span className="fa fa-bell-o" aria-hidden="true"></span></li>
              <li><button>Logout</button></li>
            </ul>
          </div>
        </header>
    );
  }
}

export default Header;
