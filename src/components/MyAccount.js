import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import News from './News';
import '../assets/scss/main.scss';
import '../assets/scss/useraccount.scss';


class UserAccount extends Component {
  me = {
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
      <div className="user-account-container">
        <Header />
        <section className="user-account default-container">
          <header className="user-name">
            <img src={this.me.avatar} aria-label={`${this.me.firstName} ${this.me.lastName}`} alt={`${this.me.firstName} ${this.me.lastName} avatar`} role="img"/>
            <h2><strong>{this.me.firstName} {this.me.lastName}</strong></h2>
          </header>
            <aside>
              <div className="side-heading">
                <h4>About me:</h4>
                <div>
                  <a href=""><span className="fa fa-pencil" aria-hidden="true"></span> edit account</a>
                </div>
              </div>
              <ul>
                <li><span className="fa fa-user-o" aria-hidden="true"></span> {this.me.firstName} {this.me.lastName}</li>
                <li><span className="fa fa-birthday-cake" aria-hidden="true"></span> {this.me.birth}</li>
                <li><span className="fa fa-envelope" aria-hidden="true"></span> {this.me.email}</li>
              </ul>
              <div className="side-heading">
                <h4>My groups:</h4>
              </div>
              {
                Object.keys(this.me.groups).map ((value, i) =>
                <ul key={i}>
                  <li><a href=""><span className={`fa fa-${this.me.groups[value]}`}></span> {value}</a></li>
                </ul>
                )
              }
            </aside>
            <section className="latest-activity-container">
              <h3>Latest activity:</h3>
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
