import React, { Component } from 'react';
import '../../assets/scss/group/notamember.scss';

class NotAMember extends Component {
  render() {
    return (
      <div className="info-container">
        <div>
          <div className="info">You are not a member of this group!</div>
          <div className="join-button">
            <button>Join</button>
          </div>
        </div>
      </div>
    );
  }
}

export default NotAMember ;
