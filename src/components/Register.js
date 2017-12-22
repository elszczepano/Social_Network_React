import React, { Component } from 'react';
import '../assets/scss/main.scss';
import '../assets/scss/register.scss';

class Register extends Component {
  render() {
    return (
      <div class="modal-container">
        <div class="modal-content">
          <div className="modal-header">
            <span class="fa fa-times" aria-hidden="true"></span>
          </div>
          <div className="modal-body">
            <input type="text"/>
            <input type="text"/>
            <input type="email"/>
            <input type="date"/>
            <input type="password"/>
            <input type="password"/>
          </div>
          <div className="modal-footer">
            <button>Register</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
