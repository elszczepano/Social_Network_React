import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from './Header';
import API from '../../api.js';
import {Link} from 'react-router-dom';
import UserShortcut from '../View/UserShortcut';
import '../../assets/scss/main.scss';
import '../../assets/scss/user/user.scss';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {user: {}, groups: []}
  }

  componentWillMount() {
    this.fetchUserDetails(this.props['match']['params']['id']);
  }

  fetchUserDetails = (id) => {
    API.get(`/users/${id}`, { 'headers': { 'Authorization': localStorage.getItem("token")} })
    .then(response => {
      response = response['data'];
      this.setState({
        user: response
      })
    })
    .then(() => {
      API.get(`/user/groups/${this.state.user.id}`, { 'headers': { 'Authorization': localStorage.getItem("token")} })
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
      if(error.response) console.log(error.response['data']['message']);
      else console.log(error);
    });
    })
  .catch(error => {
    if(error.response) console.log(error.response['data']['message']);
    else console.log(error);
  });

  }
  render() {
    if(!this.props.loginStatus) return <Redirect to="/"/>
    return (
      <React.Fragment>
      <Header />
      <div className="default-grid default-container">
        <UserShortcut />
        <section className="user-container">
          <div className="user-card">
            <img src={this.state.user.avatar} alt={`${this.state.user.name} ${this.state.user.surname} avatar`}/>
            <div className="user-bio">
              <h3>About me</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt delectus consequatur eaque, veritatis fugit, voluptates laudantium illo temporibus, provident nisi sint placeat tenetur maxime beatae commodi quae mollitia dignissimos magni.</p>
            </div>
          </div>
          <div className="user-content">
            <h2>
              <strong>{this.state.user.name} {this.state.user.surname}</strong>
            </h2>
            <div className="user-details">
              <p>Joined at: <span className="text-marker">{this.state.user.created_at}</span></p>
              <p>E-mail: <span className="text-marker">{this.state.user.email}</span></p>
            </div>
            <div className="user-groups">
              <h3>My groups</h3>
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
          </div>
        </section>
      </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    loginStatus: state.loginStatus
  }
}

User.propTypes = {
  loginStatus: PropTypes.bool.isRequired
}

export default connect(mapStateToProps)(User);
