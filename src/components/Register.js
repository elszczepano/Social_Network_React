import React, { Component } from 'react';
import PropTypes from 'prop-types';
import API from '../api.js';
import '../assets/scss/main.scss';
import '../assets/scss/register.scss';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = { errMessage: [], terms: false, registered: false, name: "", email: "", password: "", confirmPassword: ""};

    this.handleChange = this.handleChange.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleAcceptTerms = this.handleAcceptTerms.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.id]: event.target.value});
  }

  handleAcceptTerms() {
    this.setState({terms: !this.state.terms});
  }

  handleRegister(event) {
    let message = [];

    this.setState({
      registered: false,
      errMessage: message
    });

    if(this.state.password!==this.state.confirmPassword) {
      message.push("Passwords are different");
    }

    if(!this.state.terms) {
      message.push("Accept the terms");
    }

    if(message.length) {
      this.setState({errMessage: message});
      return;
    }

    API.post('/register',{
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    })
    .then(response => {
      message.push("User created succesfully. Now you can sign in");
      this.setState({
        registered: !this.state.registered,
        errMessage: message
      });
    })
    .catch(error => {
      const response = error.response['data']['message'];
      Object.keys(response).forEach((key) => {
        message.push(response[key].toString());
      })
      this.setState({errMessage: message});
    });
  }

  render() {
    return (
      <div className="modal-container">
        <div className="modal-content">
          <div className="modal-header">
            <span onClick={this.props.registerVisibility} className="fa fa-times" aria-hidden="true"></span>
          </div>
            <div className="modal-body">
              <h2>Create an account</h2>
                <label htmlFor="firstname">Name<span className="warning-marker">*</span></label>
              <input id="name" type="text" value={this.state.name} onChange={this.handleChange}/>
                <label htmlFor="email">E-mail<span className="warning-marker">*</span></label>
              <input id="email" type="email" value={this.state.email} onChange={this.handleChange}/>
                <label htmlFor="password">Password<span className="warning-marker">*</span></label>
              <input id="password" type="password" value={this.state.password} onChange={this.handleChange}/>
                <label htmlFor="confirmPassword">Confirm password<span className="warning-marker">*</span></label>
              <input id="confirmPassword" type="password" value={this.state.confirmPassword} onChange={this.handleChange}/>
              <div className="register-message-box">
              {
                this.state.errMessage.map((value) =>
                  <p className= { this.state.registered ? "success-marker" : "warning-marker" } key={value.toString()}>{value}</p>
                )
              }
              </div>
              <div className="pretty p-default">
                <input id="terms" type="checkbox" onChange={this.handleAcceptTerms}/>
                <div className="state p-primary-o">
                  <label htmlFor="terms">Accept the terms of service<span className="warning-marker">*</span></label>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="submit" onClick={this.handleRegister}>Register</button>
            </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerVisibility: PropTypes.func
}

export default Register;
