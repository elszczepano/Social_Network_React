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
    groups: {
      'IT Devs': 'rocket',
      'buy/sell Poland': 'camera-retro',
      'Memes': 'image',
      'Janusz Pol - workmates': 'money',
      'Fishing fanatics': 'ship',
      'Star Wars fans': 'rebel'
    }
  }
  render() {
    return (
      <div>
        <Header />
        <section className="default-container">
          <h2 className="text-marker">Edit account details</h2>
          <p>Edit your personal inforamtion and click <span>update</span></p>
          <form action="">
            <div>
              <label htmlFor="firstName">First name</label>
              <input name="firstName" type="text" value={this.user.firstName}/>
            </div>
            <div>
              <label htmlFor="lastName">Last name</label>
              <input name="lastNam" type="text" value={this.user.lastName}/>
            </div>
            <div>
              <label htmlFor="birth">Birth date</label>
              <input name="birth" type="date" value={this.user.birth}/>
            </div>
            <div>
              <label htmlFor="email">E-Mail Address</label>
              <input name="email" type="email" value={this.user.email}/>
            </div>
            <div>
              <label htmlFor="avatar">Avatar</label>
              <input name="avatar" type="file"/>
            </div>
            <div>
              <label htmlFor="password">New password</label>
              <input name="password" type="password"/>
            </div>
            <div>
              <label htmlFor="confirmPassword">Confirm password</label>
              <input name="confirmPassword" type="password"/>
            </div>
          <button>Update</button>
          </form>
        </section>
        <Footer />
      </div>
    );
  }
}

export default EditAccountDetails;
