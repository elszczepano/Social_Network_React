import React, { Component } from 'react';
import axios from 'axios';
import API from '../api.js';
import '../assets/scss/main.scss';
import '../assets/scss/register.scss';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {name: "", surname: "", email: "", birth_date: "", password: "", confirmPassword: "", errMessage: ""};

    this.handleChange = this.handleChange.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.id]: event.target.value});
  }
  handleRegister(event) {

    if(this.state.password!=this.state.confirmPassword) {
      this.setState({errMessage: "Passwords are different"});
      event.preventDefault();
    }
    const user = {
        name: this.state.name,
        surname: this.state.surname,
        email: this.state.email,
        birthDate: this.state.birthDate,
        password: this.state.password
    };
    //TODO axios post request
  }

  render() {
    return (
      <div className="modal-container">
        <div className="modal-content">
          <div className="modal-header">
            <span onClick={this.props.registerVisibility} className="fa fa-times" aria-hidden="true"></span>
          </div>
          <form action="" method="post">
            <div className="modal-body">
              <h2>Create an account</h2>
                <label htmlFor="firstname">Name<span className="warning-marker">*</span></label>
              <input id="name" type="text" value={this.state.name} onChange={this.handleChange} required/>
                <label htmlFor="lastname">Surname</label>
              <input id="surname" type="text" value={this.state.surname} onChange={this.handleChange}/>
                <label htmlFor="email">E-mail<span className="warning-marker">*</span></label>
              <input id="email" type="email" value={this.state.email} onChange={this.handleChange} required/>
                <label htmlFor="birthDate">Birth date</label>
              <input id="birthDate" type="date" value={this.state.birthDate} onChange={this.handleChange}/>
                <label htmlFor="password">Password<span className="warning-marker">*</span></label>
              <input id="password" type="password" value={this.state.password} onChange={this.handleChange} required/>
                <label htmlFor="confirmPassword">Confirm password<span className="warning-marker">*</span></label>
              <input id="confirmPassword" type="password" value={this.state.confirmPassword} onChange={this.handleChange} required/>
              <div className="warning-marker register-error-box">
                {this.state.errMessage}
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
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
