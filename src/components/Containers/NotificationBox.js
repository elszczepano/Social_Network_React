import React, { Component } from 'react';
import Notification from '../View/Notification';
import API from '../../api.js';
import '../../assets/scss/main.scss';
import '../../assets/scss/user/notification.scss';

class NotificationBox extends Component {
  constructor(props) {
    super(props);
    this.state = {userNotifications: [], isOpened: true};
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
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
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
    return (
      <React.Fragment>
      {
        this.state.isOpened ? <div ref={this.setWrapperRef} className="notification-box">
          <header>
            <div>Notifications ()</div>
            <div><span onClick={this.toggleNotifcation} className="fa fa-times"></span></div>
          </header>
          <section>
          {
            this.state.userNotifications.map((notification, index) =>
              <Notification content={notification} key={index}/>
            )
          }
          </section>
        </div> : ''
      }
      </React.Fragment>
    );
  }
}

export default NotificationBox;
