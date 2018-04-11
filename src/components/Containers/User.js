import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from './Header';
import API from '../../api.js';
import UserShortcut from '../View/UserShortcut';
import '../../assets/scss/main.scss';
import '../../assets/scss/user/user.scss';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {user: {}}
  }

  componentWillMount() {
    this.fetchUserDetails(this.props['match']['params']['id']);
  }

  componentWillReceiveProps(nextProps) {
    this.fetchUserDetails(nextProps['details']['id']);
  }

  fetchUserDetails = (id) => {
    API.get(`/users/${id}`, { 'headers': { 'Authorization': localStorage.getItem("token")} })
    .then(response => {
      response = response['data'];
      this.setState({
        user: response
      })
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
            <img src="https://avatarfiles.alphacoders.com/855/85557.png" />
            <h2><strong>John Doe</strong></h2>
          </div>
          <div className="user-content">
            <div className="user-bio">
              <h3>About me:</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt delectus consequatur eaque, veritatis fugit, voluptates laudantium illo temporibus, provident nisi sint placeat tenetur maxime beatae commodi quae mollitia dignissimos magni.</p>
            </div>
            <div className="user-groups">
              <h3>My groups:</h3>
              <ul>
                <li>one</li>
                <li>two</li>
                <li>three</li>
                <li>four</li>
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
