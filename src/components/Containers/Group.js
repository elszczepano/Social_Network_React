import React, { Component } from 'react';
import Header from './Header';
import API from '../../api.js';
import UserShortcut from '../View/UserShortcut';
import GroupDetails from '../View/GroupDetails';
import NotAMember from '../Control/NotAMember';
import GroupPostContainer from './GroupPostContainer';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { setId, removeId } from '../../actions/currentGroup.actions';
import PropTypes from 'prop-types';

class Group extends Component {
  constructor(props) {
    super(props);
    this.state = {groupDetails: {}, displayContent: false};
  }

  fetchGroupDetails = id => {
    API.get(`/groups/${id}`, { 'headers': { 'Authorization': localStorage.getItem("token")} })
    .then(response => {
      response = response['data'];
      this.setState({groupDetails: response});
    })
    .catch(error => {
      if(error.response) console.log(error.response['data']['message']);
      else console.log(error);
    });
  }

  fetchMembers = id => {
    API.get(`/group/users/${id}`, { 'headers': { 'Authorization': localStorage.getItem("token")} })
    .then(response => {
      response = response['data'];
      response = response.map(item => item.id);
      for(let index in response) {
          if(response[index] === this.props.user.id) {
            this.setState({displayContent: true});
          }
        }
    })
    .catch(error => {
      if(error.response) console.log(error.response['data']['message']);
      else console.log(error);
    });
  }

  componentWillMount() {
    const id = parseInt(this.props['match']['params']['id'], 10);
    this.fetchGroupDetails(id);
    this.fetchMembers(id);
    this.props.dispatch(setId(id));
  }

  componentWillReceiveProps(nextProps) {
    const id = parseInt(nextProps['match']['params']['id'], 10);
    this.fetchGroupDetails(id);
    this.fetchMembers(id);
    this.props.dispatch(setId(id));
  }

  componentWillUnmount() {
    this.props.dispatch(removeId());
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
          {this.state.displayContent ? <GroupPostContainer details={this.state.groupDetails} /> : <NotAMember />}
        </section>
      </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    loginStatus: state.loginStatus,
    user: state.userDetails
  }
}

Group.propTypes = {
  loginStatus: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(Group);
