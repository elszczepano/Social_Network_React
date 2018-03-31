import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NotificationBox from '../Containers/NotificationBox';
import API from '../../api.js';
import { connect } from 'react-redux';
import { signOut } from '../../actions/login.actions';
import { removeDetails } from '../../actions/userDetails.actions';
import '../../assets/scss/main.scss';
import '../../assets/scss/header/panel.scss';

class UserPanel extends Component {
  signOut = () => {
    API.post('/logout', {}, { 'headers': { 'Authorization': localStorage.getItem("token")} });
    localStorage.removeItem('token');
    this.props.dispatch(signOut());
    this.props.dispatch(removeDetails());
  }

  render() {
    return (
        <div className="user-panel-box">
            <input type="text" placeholder="Search groups and hit enter!"/>
            <ul className="user-icons">
              <li><span className="fa fa-plus"></span></li>
              <li><span className="fa fa-user-o"></span></li>
              <li><span className="fa fa-bell-o" onClick={() => this.refs.notifiactionBox.toggleNotifcation()}></span></li>
              <li><button onClick={this.signOut}>Logout</button></li>
            </ul>
            <NotificationBox ref="notifiactionBox" />
        </div>
    );
  }
}

UserPanel.propTypes = {
  logout: PropTypes.func
}

export default connect()(UserPanel);
