import React, { Component } from 'react';
import Header from '../Containers/Header';
import PropTypes from 'prop-types';
import API from '../../api.js';
import { connect } from 'react-redux';
import Footer from '../View/Footer';
import '../../assets/scss/main.scss';
import '../../assets/scss/user/myaccount.scss';

class MyAccount extends Component {

  render() {
    return (
      <div>
        <Header />
        <section className="edit-account-contaner default-container">
          <h2 className="text-marker">Edit account details</h2>
          <p>Edit your personal inforamtion and click <span className="text-marker">update</span></p>
          <form>
            <div className="edit-account-fields">
              <label htmlFor="firstName">First name</label>
              <input name="firstName" type="text" defaultValue={this.props.user.name} />
              <label htmlFor="lastName">Last name</label>
              <input name="lastNam" type="text" defaultValue={this.props.user.surname}/>
              <label htmlFor="birth">Birth date</label>
              <input name="birth" type="date" defaultValue={this.props.user.birth_date}/>
              <label htmlFor="email">E-Mail Address</label>
              <input name="email" type="email" defaultValue={this.props.user.email}/>
              <label htmlFor="avatar">Avatar</label>
              <input name="avatar" type="file" defaultValue={this.props.user.avatar}/>
              <label htmlFor="password">New password</label>
              <input name="password" type="password"/>
              <label htmlFor="confirmPassword">Confirm password</label>
              <input name="confirmPassword" type="password"/>
            </div>
            <div className="edit-account-buttons">
              <button type="submit">Update</button>
              <button className="danger-button">Delete account</button>
            </div>
          </form>
        </section>
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.userDetails
  }
}

MyAccount.propTypes = {
  user: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(MyAccount);
