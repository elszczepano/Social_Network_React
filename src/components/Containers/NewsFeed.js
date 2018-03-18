import React, { Component } from 'react';
import Header from './Header';
import UserShortcut from '../View/UserShortcut';
import PostContainer from './PostContainer';
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
          <PostContainer />
        </section>
      </div>
      </React.Fragment>
    );
  }
}

export default NewsFeed;
