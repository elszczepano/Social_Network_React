import React, { Component } from 'react';
import Notification from './Notification';
import '../assets/scss/main.scss';
import '../assets/scss/notification.scss';

class NotificationBox extends Component {
  
  unreaded = 2;
  render() {
    return (
      <div className="notification-box">
        <header>
          <div>Notifications({this.unreaded})</div>
          <div><span className="fa fa-caret-up"></span></div>
        </header>
        <section>
          <Notification />
          <Notification />
          <Notification />
          <Notification />
        </section>
        <footer>
          <button>Read all</button>
        </footer>
      </div>
    );
  }
}

export default NotificationBox;
