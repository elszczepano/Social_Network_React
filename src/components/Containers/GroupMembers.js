import React, {Component} from 'react';
import Header from './Header';
import UserShortcut from '../View/UserShortcut';
import Member from '../View/Member';
import PropTypes from 'prop-types';
import API from '../../api.js';
import Candidate from '../View/Candidate';
import LoadingSpinner from '../View/LoadingSpinner';
import { connect } from 'react-redux';
import { setId, removeId } from '../../actions/currentGroup.actions';
import { Redirect } from 'react-router';
import '../../assets/scss/group/members.scss';

class GroupMembers extends Component {
  constructor(props) {
    super(props);
    this.state = {groupName: '', members: [], candidates: [] , ready: false};
  }
  fetchMembers = (id) => {
    API.get(`/group/users/${id}`, { 'headers': { 'Authorization': localStorage.getItem("token")} })
    .then(response => {
      response = response['data'];
      this.setState({
        members: response
      })
    })
    .catch(error => {
      if(error.response) console.log(error.response['data']['message']);
      else console.log(error);
    });
  }

  fetchRequests = (id) => {
    API.get(`/group/requests/${id}`, { 'headers': { 'Authorization': localStorage.getItem("token")} })
    .then(response => {
      response = response['data'];
      this.setState({
        candidates: response,
        ready: true
      });
    })
    .catch(error => {
      if(error.response) console.log(error.response['data']['message']);
      else console.log(error);
    });
  }

  componentWillMount() {
    this.fetchMembers(this.props['match']['params']['id']);
    this.fetchRequests(this.props['match']['params']['id']);
    this.props.dispatch(setId(parseInt(this.props['match']['params']['id'], 10)));
  }

  componentWillReceiveProps(nextProps) {
    this.fetchMembers(nextProps['match']['params']['id']);
    this.fetchRequests(nextProps['match']['params']['id']);
    this.props.dispatch(setId(parseInt(nextProps['match']['params']['id'], 10)));
  }

  componentWillUnmount() {
    this.props.dispatch(removeId());
  }

  render() {
    if(!this.props.loginStatus) return <Redirect to="/"/>
    return (
      <div>
      <Header/>
      <div className="default-container default-grid">
        <UserShortcut/>
        <section>
          <header className="group-header">
            <h2 className="text-marker">Group name</h2>
          </header>
            <h3>Join requests: </h3>
            <table>
              <thead>
                <tr>
                  <td>User</td>
                  <td className="icon-cell">Accept</td>
                  <td className="icon-cell">Deny</td>
                </tr>
              </thead>
              <tbody>
              {
                this.state.candidates.map((candidate, index) =>
                  <Candidate candidate={candidate} key={index}/>
                )
              }
              </tbody>
            </table>
            <h3>Members: </h3>
            <table>
              <thead>
                <tr>
                  <td>Member</td>
                  <td>Role</td>
                  <td className="icon-cell">Remove</td>
                </tr>
              </thead>
              <tbody>
              {
                this.state.members.map((member, index) =>
                  <Member member={member} key={index}/>
                )
              }
              </tbody>
            </table>
            <div>
              <button>save changes</button>
            </div>
        </section>
      </div>
    </div>);
  }
}

function mapStateToProps(state) {
  return {
    loginStatus: state.loginStatus
  }
}

GroupMembers.propTypes = {
  loginStatus: PropTypes.bool.isRequired
}

export default connect(mapStateToProps)(GroupMembers);
