import React, { Component } from 'react';
import '../../assets/scss/main.scss';

class Login extends Component {
  render() {
    return (
      <div>
        <ul>
          <li><input type="text" placeholder="Username"/></li>
          <li><input type="password" placeholder="Password"/></li>
          <li><button>Sign In</button></li>
        </ul>
      </div>
    );
  }
}

export default Login;
