import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import '../../assets/scss/user/notification.scss';

class Notification extends Component {
  render() {
    const notificationBackground = classNames({
    'notification-read': this.props.content.read,
    'notification': !this.props.content.read
    });
    return (
      <div className={notificationBackground}>
        <p>{this.props.content.content}</p>
        <span className="fa fa-check"></span>
        <span className="fa fa-times"></span>
      </div>
    );
  }
}

Notification.propTypes = {
  content: PropTypes.object.isRequired
}

export default Notification;
