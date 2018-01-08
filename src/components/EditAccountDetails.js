import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import '../assets/scss/main.scss';
import '../assets/scss/editaccountdetails.scss';

class EditAccountDetails extends Component {
  user = {
    firstName: 'John',
    lastName: 'Doe',
    birth: '20-08-1989',
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
              <label htmlFor=""></label>
              <input type="text"/>
            </div>
            <div>
              <label htmlFor=""></label>
              <input type="text"/>
            </div>
            <div>
              <label htmlFor=""></label>
              <input type="date"/>
            </div>
            <div>
              <label htmlFor=""></label>
              <input type="email"/>
            </div>
            <div>
              <label htmlFor=""></label>
              <input type="file"/>
            </div>
            <div>
              <label htmlFor=""></label>
              <input type="password"/>
            </div>
            <div>
              <label htmlFor=""></label>
              <input type="password"/>
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
