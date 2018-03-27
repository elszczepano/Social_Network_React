import React, { Component } from 'react';
import Header from './Header';
import UserShortcut from '../View/UserShortcut';
import PostContainer from './PostContainer';
import SidePanel from './SidePanel';
import '../../assets/scss/main.scss';
import '../../assets/scss/newsfeed.scss';

class NewsFeed extends Component {
  render() {
    return (
      <React.Fragment>
      <Header />
      <div className="default-grid default-container">
        <UserShortcut />
        <section className="news-feed-wrapper">
          <div>
            <PostContainer />
          </div>
          <SidePanel />
        </section>
      </div>
      </React.Fragment>
    );
  }
}

export default NewsFeed;
