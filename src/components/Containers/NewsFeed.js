import React, { Component } from 'react';
import Header from './Header';
import Post from '../View/Post';
import UserShortcut from '../View/UserShortcut';
import AddPost from '../Control/AddPost';
import '../../assets/scss/main.scss';

class NewsFeed extends Component {
  render() {
    return (
      <React.Fragment>
      <Header />
      <div className="default-grid default-container">
        <UserShortcut />
        <section>
          <AddPost />
          <Post />
          <Post />
          <Post />
          <Post />
        </section>
      </div>
      </React.Fragment>
    );
  }
}

export default NewsFeed;
