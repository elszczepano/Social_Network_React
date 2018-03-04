import React, { Component } from 'react';

class Message extends Component {
  constructor(message, isRead) {
    super();
    this.message = message;
    this.isRead = isRead;
  }
  render() {
    return (
      <div>{this.message} {this.isRead}</div>
    );
  }
}

export default Message;
