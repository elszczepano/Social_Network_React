import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import '../assets/scss/main.scss';
import '../assets/scss/editaccountdetails.scss';

class EditAccountDetails extends Component {
  user = {
    firstName: 'John',
    lastName: 'Doe',
    birth: '1989-08-20',
    email: 'johndoe@gmail.com',
    avatar: 'https://avatarfiles.alphacoders.com/855/85557.png',
  }
  render() {
    return (
      <div>
        <Header />
        <section className="edit-account-contaner default-container">
          <h2 className="text-marker">Edit account details</h2>
          <p>Edit your personal inforamtion and click <span>update</span></p>
          <form action="">
            <div className="edit-account-fields">
              <label htmlFor="firstName">First name</label>
              <input name="firstName" type="text" defaultValue={this.user.firstName}/>
              <label htmlFor="lastName">Last name</label>
              <input name="lastNam" type="text" defaultValue={this.user.lastName}/>
              <label htmlFor="birth">Birth date</label>
              <input name="birth" type="date" defaultValue={this.user.birth}/>
              <label htmlFor="email">E-Mail Address</label>
              <input name="email" type="email" defaultValue={this.user.email}/>
              <label htmlFor="avatar">Avatar</label>
              <input name="avatar" type="file"/>
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

export default EditAccountDetails;
