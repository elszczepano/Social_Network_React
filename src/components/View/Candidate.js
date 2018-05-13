import React, { Component } from 'react';
import PropTypes from 'prop-types';
import API from '../../api.js';
import '../../assets/scss/group/members.scss';

class Candidate extends Component {
  constructor(props) {
    super(props);
    this.state = {deleted: false, user: this.props.candidate.user.surname ? `${this.props.candidate.user.name} ${this.props.candidate.user.surname}`: this.props.candidate.user.name};
  }

  applyRequest = () => {
    API.post('/user-groups',
    {
      group_id: this.props.candidate.group_id,
      user_id: this.props.candidate.user_id
    },
    {
      'headers': { 'Authorization': localStorage.getItem("token")}
    })
    .then(this.deleteRequest())
    .catch(error => {
      if(error.response) console.log(error.response['data']['message']);
      else console.log(error);
    });
  }

  deleteRequest = () => {
    API.delete(`/requests/${this.props.candidate.id}`, { 'headers': { 'Authorization': localStorage.getItem("token")} })
    .then(this.setState({deleted: true}))
    .catch(error => {
      if(error.response) console.log(error.response['data']['message']);
      else console.log(error);
    });
  }

  render() {
    const content = !this.state.deleted ? (
      <tr>
        <td>{this.state.user}</td>
        <td className="icon-cell">
          <span onClick={this.applyRequest} className="fa fa-check"></span>
        </td>
        <td className="icon-cell">
          <span onClick={this.deleteRequest} className="fa fa-times"></span>
        </td>
      </tr>
      ) : (
        <tr></tr>
      )
    return (
      <React.Fragment>
        {content}
      </React.Fragment>
    );
  }
}

Candidate.propTypes = {
  candidate: PropTypes.object.isRequired
}

export default Candidate;
