import React, { Component } from 'react';
import Notification from '../View/Notification';
import '../../assets/scss/main.scss';
import '../../assets/scss/user/notification.scss';

class NotificationBox extends Component {
  constructor(){
    super();
    this.state = {
      messages: [
        {
          message: 'test',
          isRead: false
        }
      ]
    }
  }
  unread = 2;
  render() {
    return (
      <div className="notification-box">
        <header>
          <div>Notifications({this.unread})</div>
          <div><span onClick={this.props.registerVisibility} className="fa fa-times"></span></div>
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
