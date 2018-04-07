import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import API from '../../api.js';
import '../../assets/scss/main.scss';
import '../../assets/scss/user/usershortcut.scss';

class UserShortcut extends Component {
  constructor(props) {
    super(props);
    this.state = {id: "", name: "", surname: "", avatar: "", groups: []};
  }
  componentWillMount() {
      API.get(`/user/groups/${this.props.user.id}`, { 'headers': { 'Authorization': localStorage.getItem("token")} })
      .then(response => {
        response = response['data'];
        response = response.map(group => ({
          name: group.name,
          icon: group.icon.name,
          id: group.id
        }));
        this.setState({
          groups: response
        })
      })
    .catch(error => {
      if(error.response) {
        const response = error.response['data']['message'];
        console.log(response);
      }
      else {
        console.log(error);
      }
    });
  }
  render() {
    return (
      <aside className="user-shortcuts">
        <div className="account-shortcut">
          <img src={this.props.user.avatar} alt={`${this.props.user.name} ${this.props.user.surname} avatar`}/>
          <h3>{this.props.user.name} {this.props.user.surname}</h3>
        </div>
        <h3>Browse groups:</h3>
        <div className="groups-shortcut">
          <ul>
          {
            this.state.groups.map((group, index) => {
              return (
                <li key={index}>
                  <Link to={`/group/${group.id}`}>
                    <span className="group-name">{group.name}</span>
                    <span className={`fa fa-${group.icon}`}></span>
                  </Link>
                </li>
              )
            })
          }
          </ul>
        </div>
      </aside>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.userDetails
  }
}

UserShortcut.propTypes = {
  user: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(UserShortcut);
