import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import News from './News';
import '../assets/scss/main.scss';
import '../assets/scss/newsfeed.scss';

class NewsFeed extends Component {
  meShortcut = {
    firstName: 'John',
    lastName: 'Doe',
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
      <div className="newsfeed-container default-container">
        <aside className="aside-shortcuts">
          <div className="account-shortcut">
          <img src={this.meShortcut.avatar} alt={`${this.meShortcut.firstName} ${this.meShortcut.lastName} avatar`}/>
          <h3>{this.meShortcut.firstName} {this.meShortcut.lastName}</h3>
          </div>
          <div className="groups-shortcut">
          <h4>Groups:</h4>
          {
            Object.keys(this.meShortcut.groups).map ((value, i) =>
            <ul key={i}>
              <li><a href=""><span className={`fa fa-${this.meShortcut.groups[value]}`}></span> {value}</a></li>
            </ul>
            )
          }
          </div>
        </aside>
        <section>
        <News />
        <News />
        <News />
        <News />
        <News />
        <News />
        </section>
      </div>
      <Footer />
      </div>
    );
  }
}

export default NewsFeed;
