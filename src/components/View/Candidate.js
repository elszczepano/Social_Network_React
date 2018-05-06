import React, { Component } from 'react';
import '../../assets/scss/group/members.scss';

class Member extends Component {
  constructor(props) {
    super(props);
    this.state = {user: this.props.candidate.user.surname ? `${this.props.candidate.user.name} ${this.props.candidate.user.surname}`: this.props.candidate.user.name};
  }

  render() {
    return(
      <tr>
        <td>{this.state.user}</td>
        <td className="icon-cell">
          <span className="fa fa-check"></span>
        </td>
        <td className="icon-cell">
          <span className="fa fa-times"></span>
        </td>
      </tr>
    );
  }
}

export default Member;
