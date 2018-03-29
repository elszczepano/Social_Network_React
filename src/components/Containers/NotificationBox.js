import React, { Component } from 'react';
import Notification from '../View/Notification';
import API from '../../api.js';
import '../../assets/scss/main.scss';
import '../../assets/scss/user/notification.scss';

class NotificationBox extends Component {
  constructor(props) {
    super(props);
    this.state = {userNotifications: [], unread: 0, isOpened: false};
  }

  componentDidUpdate() {
    if(this.state.isOpened) this.fetchNotifications();
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }


  fetchNotifications = () => {
    API.get('/me', { 'headers': { 'Authorization': localStorage.getItem("token")} })
    .then(response => response['data']['id'])
    .then(id => {
      API.get(`user/notifications/${id}`, { 'headers': { 'Authorization': localStorage.getItem("token")} })
      .then(response => {
        response = response['data'];
        response = response.map(notification => notification);
        this.setState({
          userNotifications: response
        });
        for(let notification of response) {
          if(!notification.read) this.setState({unread: this.state.unread + 1});
        }
      })
    })
  }

  setWrapperRef = (node) => {
    this.wrapperRef = node;
  }

  toggleNotifcation = () => {
    this.setState(prevState => ({
      isOpened: !this.state.isOpened
    }));
  }

  handleClickOutside = (event) => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target) && this.state.isOpened) {
      this.toggleNotifcation();
    }
  }
  render() {
    if(this.state.isOpened) {
      return (
          <div ref={this.setWrapperRef} className="notification-box">
            <header>
              <div>Notifications ({this.state.unread})</div>
              <div><span onClick={this.toggleNotifcation} className="fa fa-times"></span></div>
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
    else return null;
  }
}

export default NotificationBox;
