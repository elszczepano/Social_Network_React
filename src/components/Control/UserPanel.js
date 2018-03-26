import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NotificationBox from '../Containers/NotificationBox';
import API from '../../api.js';
import { connect } from 'react-redux';
import { signOut } from '../../actions/login.actions';
import '../../assets/scss/main.scss';
import '../../assets/scss/header/panel.scss';

class UserPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {showNotifications: false};
  }

  handleRegisterClick = () => {
    this.setState({
      showNotifications: !this.state.showNotifications
    });
  }

  signOut = () => {
    API.post('/logout', {}, { 'headers': { 'Authorization': localStorage.getItem("token")} });
    localStorage.removeItem('token');
    this.props.dispatch(signOut());
  }

  render() {
    return (
        <div className="user-panel-box">
            <input type="text" placeholder="Search groups and hit enter!"/>
            <ul className="user-icons">
              <li><span className="fa fa-plus"></span></li>
              <li><span className="fa fa-user-o"></span></li>
              <li><span className="fa fa-bell-o" onClick={this.handleRegisterClick}></span></li>
              <li><button onClick={this.signOut}>Logout</button></li>
            </ul>
            { this.state.showNotifications ? <NotificationBox registerVisibility={this.handleRegisterClick} /> : '' }
        </div>
    );
  }
}

UserPanel.propTypes = {
  logout: PropTypes.func
}

export default connect()(UserPanel);
