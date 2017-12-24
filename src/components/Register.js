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
          <form action="" method="post">
            <div className="modal-body">
              <h2>Create an account</h2>
              <label htmlFor="firstname">Name</label>
              <input name="firstname" type="text" required/>
              <label htmlFor="lastname">Surname</label>
              <input name="lastname" type="text" required/>
              <label htmlFor="email">E-mail</label>
              <input name="email" type="email" required/>
              <label htmlFor="birthdate">Birth date</label>
              <input name="birthdate" type="date" required/>
              <label htmlFor="password">Password</label>
              <input name="password" type="password" required/>
              <label htmlFor="confirmPassword">Confirm password</label>
              <input name="confirmPassword" type="password" required/>
              <div className="pretty p-default">
                <input name="terms" type="checkbox" required/>
                <div className="state p-primary-o">
                 <label htmlFor="terms">Accept <a href="">the terms</a></label>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="submit">Register</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
