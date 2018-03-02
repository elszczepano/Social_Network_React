import React, { Component } from 'react';
import API from '../api.js';
import '../assets/scss/main.scss';
import '../assets/scss/register.scss';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = { errMessage: []};

    this.handleChange = this.handleChange.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.id]: event.target.value});
  }
  handleRegister(event) {
    let message = [];
    if(this.state.password!==this.state.confirmPassword) {
      message.push("Passwords are different");
      this.setState({errMessage: message});
      event.preventDefault();
      return;
    }
    else this.setState({errMessage: []});

    API.post('/register',{
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    })
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      const response = error.response['data']['message'];
      Object.keys(response).forEach((key) => {
        message.push(response[key].toString());
      })
      this.setState({errMessage: message});
      console.log(this.state.errMessage);
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
              <input id="name" type="text" value={this.state.name} onChange={this.handleChange} required/>
                <label htmlFor="email">E-mail<span className="warning-marker">*</span></label>
              <input id="email" type="email" value={this.state.email} onChange={this.handleChange} required/>
                <label htmlFor="password">Password<span className="warning-marker">*</span></label>
              <input id="password" type="password" value={this.state.password} onChange={this.handleChange} required/>
                <label htmlFor="confirmPassword">Confirm password<span className="warning-marker">*</span></label>
              <input id="confirmPassword" type="password" value={this.state.confirmPassword} onChange={this.handleChange} required/>
              <div  className="register-message-box">
              {
                this.state.errMessage.map((value) =>
                  <p className="warning-marker" key={value.toString()}>{value}</p>
                )
              }
              </div>
              <div className="pretty p-default">
                <input id="terms" type="checkbox" required/>
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

export default Register;
