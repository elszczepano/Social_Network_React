import React, { Component } from 'react';
import API from '../../api.js';
import '../../assets/scss/main.scss';
import '../../assets/scss/user/usershortcut.scss';

class UserShortcut extends Component {
  constructor(props) {
    super(props);
    this.state = {name: "", surname: "", avatar: ""};
  }

  componentWillMount() {
    API.get('/me')
    .then(response => {
      response = response['data'];
      this.setState({
        name: response['name'],
        surname: response['surname'],
      });
      if(response['avatar']) {
        this.setState({avatar: response['avatar']});
      }
      else {
        this.setState({avatar: '../../assets/images/avatar-15777909_1280.png'});
      }
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
          <h3><a className="text-marker" href="">{this.state.name} {this.state.surname}</a></h3>
        </div>
        <div className="notifications-shortcut">
          <h4 className="text-marker"><span className="fa fa-bell" aria-hidden="true"></span> Notifications</h4>
        </div>
        <div className="groups-shortcut">
          <h4><span className="fa fa-users" aria-hidden="true"></span> Groups</h4>
        </div>
      </aside>
    );
  }
}

export default UserShortcut;
