import React, { Component } from 'react';
import API from '../../api.js';
import '../../assets/scss/main.scss';
import '../../assets/scss/header/login.scss';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {email: "", password: "", errMessage: ""};
  }

  handleChange = (event) => {
    this.setState({[event.target.id]: event.target.value});
  }

  handleLogin = (event) => {
    this.setState({errMessage: ""});
    if(!this.state.email||!this.state.password) {
      this.setState({errMessage: "Enter username and password"});
      return;
    }

    API.post('/login', {
      email: this.state.email,
      password: this.state.password
    })
    .then(response => {
      const token = response['data']['access_token'];
      API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      this.props.parent.handleIsLogged();
    })
    .catch(error => {
      const response = error.response['data']['error'];
      this.setState({errMessage: response});
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
