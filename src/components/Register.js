import React, { Component } from 'react';
import '../assets/scss/main.scss';
import '../assets/scss/register.scss';

class Register extends Component {
  render() {
    return (
      <div className="modal-container">
        <div className="modal-content">
          <div className="modal-header">
            <span onClick={this.props.registerVisibility} className="fa fa-times" aria-hidden="true"></span>
          </div>
          <div className="modal-body">
            <h2>Create an account</h2>
            <label>Name</label>
            <input type="text"/>
            <label>Surname</label>
            <input type="text"/>
            <label>E-mail</label>
            <input type="email"/>
            <label htmlFor="birthdate">Birth date</label>
            <input name="birthdate" type="date"/>
            <label>Password</label>
            <input type="password"/>
            <label>Confirm password</label>
            <input type="password"/>
            <div className="pretty p-default">
              <input type="checkbox" />
              <div className="state p-primary-o">
               <label>Accept <a href="">the terms</a></label>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="submit">Register</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
