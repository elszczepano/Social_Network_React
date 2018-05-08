import React, { Component } from 'react';
import PropTypes from 'prop-types';
import API from '../../api.js';
import '../../assets/scss/group/members.scss';

class Member extends Component {
  constructor(props) {
    super(props);
    this.state = {deleted: false, user: this.props.member.surname ? `${ this.props.member.name} ${ this.props.member.surname}`:  this.props.member.name};
  }

  removeUserFromGroup = () => {
    API.delete(`/user-groups/${this.props.member.pivot.id}`, { 'headers': { 'Authorization': localStorage.getItem("token")} })
    .then(this.setState({
      deleted: true
    }))
    .catch(error => {
      if(error.response) console.log(error.response['data']['message']);
      else console.log(error);
    });
  }

  render() {
    const content = !this.state.deleted ? (
      <tr>
        <td>{this.state.user}</td>
        <td>{this.props.member.role[0].name}</td>
        <td className="icon-cell">
          <span onClick={this.removeUserFromGroup} className="fa fa-times"></span>
        </td>
      </tr>
      ) : (
        <tr>
          <td>User removed</td>
        </tr>
      )
    return (
      <React.Fragment>
        {content}
      </React.Fragment>
    );
  }
}

Member.propTypes = {
  member: PropTypes.object.isRequired
}

export default Member;
