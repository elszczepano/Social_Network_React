import React from 'react';
import PropTypes from 'prop-types';
import '../../assets/scss/user/notification.scss';

const Notification = (props) => (
  <div className="notification">
    <p>{props.content.content}</p>
    <span className="fa fa-check"></span>
    <span className="fa fa-times"></span>
  </div>
);

Notification.propTypes = {
  content: PropTypes.object.isRequired
}

export default Notification;
