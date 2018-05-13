import React, { Component } from 'react';
import NotificationBox from '../Containers/NotificationBox';
import API from '../../api.js';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { signOut } from '../../actions/login.actions';
import { removeDetails } from '../../actions/userDetails.actions';
import '../../assets/scss/header/panel.scss';

class UserPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {searchKey: "", searching: false}
  }

  handleChange = event => {
    this.setState({[event.target.id]: event.target.value});
  }

  signOut = () => {
    API.post('/logout', {}, { 'headers': { 'Authorization': localStorage.getItem("token")} })
    .catch(error => {
      if(error.response) console.log(error.response['data']['message']);
      else console.log(error);
    });
    localStorage.removeItem('token');
    this.props.dispatch(signOut());
    this.props.dispatch(removeDetails());
  }
  
  render() {
    return (
        <div className="user-panel">
            <form action={`/search/${this.state.searchKey}`}>
              <input id="searchKey" onChange={this.handleChange} type="text" placeholder="Search groups and hit enter!" required/>
            </form>
            <ul className="user-icons">
              <li><Link to="/create"><span className="fa fa-plus"></span></Link></li>
              <li><Link to="/my-account"><span className="fa fa-user-o"></span></Link></li>
              <li><span className="fa fa-bell-o" onClick={() => this.refs['notificationBox'].getWrappedInstance().toggleNotifcation()}></span></li>
              <li><button onClick={this.signOut}>Logout</button></li>
            </ul>
            <NotificationBox ref="notificationBox" />
        </div>
    );
  }
}

export default connect()(UserPanel);
