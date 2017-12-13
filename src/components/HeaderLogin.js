import React, { Component } from 'react';
import '../assets/scss/main.scss';
import '../assets/scss/header.scss';

class HeaderLogin extends Component {
  render() {
    return (
      <div className="main-header">
        <div className="logo">
          <h1>Groupeé</h1>
        </div>
        <div>
          <ul>
            <li><input type="text" placeholder="Username"/></li>
            <li><input type="password" placeholder="Password"/></li>
            <li><button>Sign In</button></li>
            <li>
              <a href="">new? register now</a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default HeaderLogin;
