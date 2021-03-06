import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import API from '../../api.js';
import '../../assets/scss/user/notification.scss';

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {read: this.props.content.read, deleted: false};
  }

  readNotification = () => {
      API.put(`/notifications/${this.props.content.id}`,
      {
        read: true
      },
      {
        'headers': { 'Authorization': localStorage.getItem("token")}
      })
      .then(this.setState({read: true}))
      .catch(error => {
        if(error.response) console.log(error.response['data']['message']);
        else console.log(error);
      });
  }
  deleteNotification = () => {
    API.delete(`/notifications/${this.props.content.id}`, { 'headers': { 'Authorization': localStorage.getItem("token")} })
    .then(this.setState({deleted: true}))
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
    const content = !this.state.deleted ? (
        <div className={notificationBackground}>
          <p>{this.props.content.content}</p>
          {!this.state.read ? <span onClick={this.readNotification} className="fa fa-check"></span> : <span></span>}
          <span onClick={this.deleteNotification} className="fa fa-times"></span>
        </div>
      ) : (
        <div></div>
      )
    return (
      <React.Fragment>
        {content}
      </React.Fragment>
    );
  }
}

Notification.propTypes = {
  content: PropTypes.object.isRequired
}

export default Notification;
