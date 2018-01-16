import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import News from './News';
import '../assets/scss/main.scss';
import '../assets/scss/useraccount.scss';

class UserAccount extends Component {
  user = {
    firstName: 'John',
    lastName: 'Doe',
    birth: '20-08-1989',
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
      <div className="user-account-container">
        <Header />
        <section className="user-account default-container">
          <header className="user-name">
            <img src={this.user.avatar} alt={`${this.user.firstName} ${this.user.lastName} avatar`}/>
            <h2><strong>{this.user.firstName} {this.user.lastName}</strong></h2>
          </header>
            <aside>
              <h4>About me:</h4>
              <ul className="default-group-list">
                <li><span className="fa fa-user-o" aria-hidden="true"></span> {this.user.firstName} {this.user.lastName}</li>
                <li><span className="fa fa-birthday-cake" aria-hidden="true"></span> {this.user.birth}</li>
              </ul>
              <h4>My groups:</h4>
              <ul  className="default-group-list">
              {
                Object.keys(this.user.groups).map ((value, i) =>
                <li key={i}>
                  <span className={`fa fa-${this.user.groups[value]}`}></span> {value}
                </li>
                )
              }
              </ul>
            </aside>
            <section className="news-container">
              <News />
              <News />
              <News />
              <News />
              <News />
              <News />
            </section>
        </section>
        <Footer />
      </div>
    );
  }
}

export default UserAccount;
