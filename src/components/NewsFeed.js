import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import News from './News';
import UserShortcut from './UserShortcut';
import AddPost from './AddPost';
import '../assets/scss/main.scss';

class NewsFeed extends Component {
  render() {
    return (
      <div>
      <Header />
      <div className="default-grid default-container">
        <UserShortcut />
        <section>
        <AddPost />
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
