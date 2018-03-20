import React, { Component } from 'react';
import Notification from '../View/Notification';
import API from '../../api.js';
import '../../assets/scss/main.scss';
import '../../assets/scss/user/notification.scss';

class NotificationBox extends Component {
  constructor(props) {
    super(props);
    this.state = {userNotifications: []};
  }

  componentWillMount() {
    API.get('/me', { 'headers': { 'Authorization': localStorage.getItem("token")} })
    .then(response => response['data']['id'])
    .then(id => {
      API.get(`user/notifications/${id}`, { 'headers': { 'Authorization': localStorage.getItem("token")} })
      .then(response => {
        response = response['data'];
        response = response.map(notification => notification);
        this.setState({
          userNotifications: response
        })
      })
    })
    .then()
  }
  render() {
    return (
      <div className="notification-box">
        <header>
          <div>Notifications ()</div>
          <div><span onClick={this.props.registerVisibility} className="fa fa-times"></span></div>
        </header>
        <section>
        {
          this.state.userNotifications.map((notification, index) =>
            <Notification content={notification} key={index}/>
          )
        }
        </section>
      </div>
    );
  }
}

export default NotificationBox;
