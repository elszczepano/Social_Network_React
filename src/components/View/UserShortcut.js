import React, { Component } from 'react';
import API from '../../api.js';
import '../../assets/scss/main.scss';
import '../../assets/scss/user/usershortcut.scss';

class UserShortcut extends Component {
  constructor(props) {
    super(props);
    this.state = {id: "", name: "", surname: "", avatar: "", groups: []};
  }

  componentWillMount() {
    API.get('/me', { 'headers': { 'Authorization': localStorage.getItem("token")} })
    .then(response => {
      response = response['data'];
      this.setState({
        id: response['id'],
        name: response['name'],
        surname: response['surname'],
        avatar: response['avatar']
      });
    })
    .then(() => {
      API.get(`/user/groups/${this.state.id}`, { 'headers': { 'Authorization': localStorage.getItem("token")} })
      .then(response => {
        response = response['data'];
        response = response.map(group => group.name);
        console.log(response);
        this.setState({
          groups: response
        })
      })
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
        <h3>Browse groups: </h3>
        <div className="groups-shortcut">
          <ul>
          {
            this.state.groups.map((value) => {
              return <li key={value.toString()}>{value}</li>
            })
          }
          </ul>
        </div>
      </aside>
    );
  }
}

export default UserShortcut;
