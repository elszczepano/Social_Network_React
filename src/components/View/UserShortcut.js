import React, { Component } from 'react';
import API from '../../api.js';
import '../../assets/scss/main.scss';
import '../../assets/scss/user/usershortcut.scss';

class UserShortcut extends Component {
  constructor(props) {
    super(props);
    this.state = {id: "", name: "", surname: "", avatar: ""};
  }

  componentWillMount() {
    API.get('/me', { 'headers': { 'Authorization': localStorage.getItem("token")} })
    .then(response => {
      response = response['data'];
      this.setState({
        name: response['name'],
        surname: response['surname'],
        avatar: response['avatar']
      });
    })
    .catch(error => {
      const response = error.response['data']['message'];
      console.log(response);
    });
  }
  render() {
    return (
      <aside className="user-shortcuts">
        <div className="account-shortcut">
          <img src={this.state.avatar} alt={`${this.state.name} ${this.state.surname} avatar`}/>
          <h3>{this.state.name} {this.state.surname}</h3>
        </div>
        <div className="groups-shortcut">
          <h4><span className="fa fa-users" aria-hidden="true"></span> Groups</h4>
        </div>
      </aside>
    );
  }
}

export default UserShortcut;
