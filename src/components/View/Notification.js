import React, { Component } from 'react';
import '../../assets/scss/main.scss';
import '../../assets/scss/user/notification.scss';

class Notification extends Component {

  isReaded = true;

  render() {
    return (
      <div className="notification">
        <p>Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.</p>
        <span className="fa fa-check"></span>
        <span className="fa fa-times"></span>
      </div>
    );
  }
}

export default Notification;
