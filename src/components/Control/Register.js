import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import API from '../../api.js';
import '../../assets/scss/main.scss';
import '../../assets/scss/header/register.scss';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = { errMessage: [], terms: false, registered: false, name: "", email: "", password: "", confirmPassword: ""};
  }

  handleChange = (event) => {
    this.setState({[event.target.id]: event.target.value});
  }

  handleAcceptTerms = () => {
    this.setState({terms: !this.state.terms});
  }

  handleRegister = (event) => {

    event.preventDefault();
    let messages = [];

    function checkField(field, message) {
      if(!field) messages.push(message);
    }

    this.setState({
      registered: false,
      errMessage: messages
    });

    checkField(this.state.name, "The name field is required");
    checkField(this.state.email, "The email field is required");
    checkField(this.state.password, "The password field is required");
    checkField(this.state.confirmPassword, "The confirm password field is required");
    checkField(this.state.terms, "You must accept the terms");

    if(this.state.password!==this.state.confirmPassword) {
      messages.push("Passwords are different");
    }

    if(messages.length) {
      this.setState({errMessage: messages});
      return;
    }

    API.post('/register',{
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    })
    .then(response => {
      messages.push("User created succesfully. Now you can sign in");
      this.setState({
        registered: true,
        errMessage: messages
      });
    })
    .catch(error => {
      if(error.response) {
        const response = error.response['data']['message'];
        Object.keys(response).forEach((key) => {
          messages.push(response[key].toString());
        })
        this.setState({errMessage: messages});
      }
      else console.log(error);
    });
  }

  render() {
    const messageClass = classNames({
    'success-marker': this.state.registered,
    'warning-marker': !this.state.registered
    });
    return (
      <form>
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
                  <p className={messageClass} key={value.toString()}>{value}</p>
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
      </form>
    );
  }
}

Register.propTypes = {
  registerVisibility: PropTypes.func
}

export default Register;
