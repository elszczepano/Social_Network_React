import React, { Component } from 'react';
import API from '../../api.js';
import '../../assets/scss/main.scss';
import '../../assets/scss/header/login.scss';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {email: "", password: "", errMessage: ""};

    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.id]: event.target.value});
  }

  handleLogin(event) {
    API.post('/login', {
    email: this.state.email,
    password: this.state.password
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error.response);
  });
  }


  render() {
    return (
      <div className="login-box">
        <ul>
          <li className="warning-marker">{this.state.errMessage}</li>
          <li><input id="email" value={this.state.email} onChange={this.handleChange} type="text" placeholder="Email"/></li>
          <li><input id="password" value={this.state.password} onChange={this.handleChange} type="password" placeholder="Password"/></li>
          <li><button onClick={this.handleLogin}>Sign In</button></li>
        </ul>
      </div>
    );
  }
}

export default Login;
