import React, { Component } from 'react';
import Header from './Header';
import Footer from '../View/Footer';
import News from '../View/News';
import UserShortcut from '../View/UserShortcut';
import AddPost from '../Control/AddPost';
import Group from '../View/Group';
import '../../assets/scss/main.scss';

class NewsFeed extends Component {
  render() {
    return (
      <React.Fragment>
      <Header />
      <div className="default-grid default-container">
        <UserShortcut />
        <section>
          <Group />
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
      </React.Fragment>
    );
  }
}

export default NewsFeed;
