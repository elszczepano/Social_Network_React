import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../assets/scss/main.scss';
import '../../assets/scss/user/notification.scss';

class Notification extends Component {

  isReaded = true;

  render() {
    return (
      <div className="notification">
        <p>{this.props.content.content}</p>
        <span className="fa fa-check"></span>
        <span className="fa fa-times"></span>
      </div>
    );
  }
}

Notification.propTypes = {
  content: PropTypes.object
}

export default Notification;
