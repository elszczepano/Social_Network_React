import React, { Component } from 'react';
import Header from './Header';
import UserShortcut from '../View/UserShortcut';
import UserPostContainer from './UserPostContainer';
import SidePanel from './SidePanel';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../../assets/scss/main.scss';
import '../../assets/scss/newsfeed.scss';

class NewsFeed extends Component {
  render() {
    if(!this.props.loginStatus) return <Redirect to="/"/>
    return (
      <React.Fragment>
      <Header />
      <div className="default-grid default-container">
        <UserShortcut />
        <section className="news-feed-wrapper">
          <div>
            <UserPostContainer />
          </div>
          <SidePanel />
        </section>
      </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    loginStatus: state.loginStatus
  }
}

NewsFeed.propTypes = {
  loginStatus: PropTypes.bool.isRequired
}

export default connect(mapStateToProps)(NewsFeed);
