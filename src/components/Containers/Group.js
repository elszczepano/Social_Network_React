import React, { Component } from 'react';
import Header from './Header';
import API from '../../api.js';
import UserShortcut from '../View/UserShortcut';
import GroupDetails from '../View/GroupDetails';
import GroupPostContainer from './GroupPostContainer';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../../assets/scss/main.scss';
import '../../assets/scss/group/group.scss';

class Group extends Component {
  constructor(props) {
    super(props);
    this.state = {groupDetails: {}};
  }

  fetchGroupDetails = (id) => {
    API.get(`/groups/${id}`, { 'headers': { 'Authorization': localStorage.getItem("token")} })
    .then(response => {
      response = response['data'];
      this.setState({
        groupDetails: response
      });
    })
    .catch(error => {
      if(error.response) console.log(error.response['data']['message']);
      else console.log(error);
    });
  }

  componentWillMount() {
    this.fetchGroupDetails(this.props['match']['params']['id']);
  }

  componentWillReceiveProps(nextProps) {
    this.fetchGroupDetails(nextProps['match']['params']['id']);
  }

  render() {
    if(!this.props.loginStatus) return <Redirect to="/"/>
    return (
      <React.Fragment>
      <Header />
      <div className="default-grid default-container">
        <UserShortcut />
        <section>
          <GroupDetails details={this.state.groupDetails} />
          <GroupPostContainer details={this.state.groupDetails} />
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

Group.propTypes = {
  loginStatus: PropTypes.bool.isRequired
}

export default connect(mapStateToProps)(Group);
