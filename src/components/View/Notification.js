import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import API from '../../api.js';
import '../../assets/scss/user/notification.scss';

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {read: this.props.content.read};
  }

  readNotification = () => {
      API.put(`/notifications/${this.props.content.id}`,
      {
        read: true
      },
      {
        'headers': { 'Authorization': localStorage.getItem("token")}
      })
      .then(this.setState({
        read: true
      }))
      .catch(error => {
        if(error.response) console.log(error.response['data']['message']);
        else console.log(error);
      });
  }
  render() {
    const notificationBackground = classNames({
    'notification-read': this.state.read,
    'notification': !this.state.read
    });
    return (
      <div className={notificationBackground}>
        <p>{this.props.content.content}</p>
        {!this.state.read ? <span onClick={this.readNotification} className="fa fa-check"></span> : <span></span>}
        <span className="fa fa-times"></span>
      </div>
    );
  }
}

Notification.propTypes = {
  content: PropTypes.object.isRequired
}

export default Notification;
