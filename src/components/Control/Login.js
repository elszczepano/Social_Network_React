import React, { Component } from 'react';
import API from '../../api.js';
import { connect } from 'react-redux';
import { signIn } from '../../actions/login.actions';
import { getDetails } from '../../actions/userDetails.actions';
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
    event.preventDefault();
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
      localStorage.setItem("token",`Bearer ${response['data']['access_token']}`);
      API.get('/me', { 'headers': { 'Authorization': localStorage.getItem("token")} })
      .then(response => {
        response = response['data'];
        this.props.dispatch(getDetails(response));
        this.props.dispatch(signIn());
      })

    })
    .catch(error => {
      if(error.response) this.setState({errMessage: error.response['data']['error']});
      else console.log(error);
    });
  }

  render() {
    return (
      <form>
        <div className="login-box">
          <ul>
            <li className="warning-marker">{this.state.errMessage}</li>
            <li><input id="email" value={this.state.email} onChange={this.handleChange} type="text" placeholder="Email"/></li>
            <li><input id="password" value={this.state.password} onChange={this.handleChange} type="password" placeholder="Password"/></li>
            <li><button onClick={this.handleLogin}>Sign In</button></li>
          </ul>
        </div>
      </form>
    );
  }
}

export default connect()(Login);
