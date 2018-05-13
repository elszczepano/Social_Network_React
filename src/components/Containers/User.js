import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from './Header';
import API from '../../api.js';
import storageLink from '../../storageLink.js';
import UserShortcut from '../View/UserShortcut';
import LoadingSpinner from '../View/LoadingSpinner';
import '../../assets/scss/user/user.scss';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {user: {}, groups: [], ready: false}
  }

  componentWillMount() {
    this.fetchUserDetails(this.props['match']['params']['id']);
  }

  fetchUserDetails = id => {
    API.get(`/users/${id}`, { 'headers': { 'Authorization': localStorage.getItem("token")} })
    .then(response => {
      response = response['data'];
      this.setState({user: response});
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
          groups: response,
          ready: true
        })
      })
    })
    .catch(error => {
      if(error.response) console.log(error.response['data']['message']);
      else console.log(error);
    });
  }
  render() {
    const content = this.state.ready ? (
      <React.Fragment>
        <div className="user-card">
          <img src={`${storageLink}${this.state.user.avatar}`} alt={`${this.state.user.name} ${this.state.user.surname} avatar`}/>
          <div className="user-bio">
            <h3>About me</h3>
            <p>{this.state.user.description ? this.state.user.description : "This user does not have description yet."}</p>
          </div>
        </div>
        <div className="user-content">
          <h2>
            <strong>{this.state.user.name} {this.state.user.surname}</strong>
          </h2>
          <div className="user-details">
            <p>Joined at: <span className="text-marker">{this.state.user.created_at}</span></p>
            <p>E-mail: <span className="text-marker">{this.state.user.email}</span></p>
            {this.state.user.birth_date ? <p>Birth date: <span className="text-marker">{this.state.user.birth_date}</span></p> :''}
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
      </React.Fragment>
    ) : (
      <LoadingSpinner />
    )
    if(!this.props.loginStatus) return <Redirect to="/"/>
    return (
      <React.Fragment>
      <Header />
      <div className="default-grid default-container">
        <UserShortcut />
        <section className="user-container">
          {content}
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
