import React, { Component } from 'react';
import '../../assets/scss/group/members.scss';

class Member extends Component {
  constructor(props) {
    super(props);
    this.state = {user: this.props.member.surname ? `${ this.props.member.name} ${ this.props.member.surname}`:  this.props.member.name};
  }

  render() {
    return(
      <tr>
        <td>{this.state.user}</td>
        <td>{this.props.member.role[0].name}</td>
        <td className="icon-cell">
          <span className="fa fa-times"></span>
        </td>
      </tr>
    );
  }
}

export default Member;
