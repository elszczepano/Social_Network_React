import React, { Component } from 'react';

class Messages extends Component {
    constructor(message, isRead) {
      super(message, isRead);
      this.message = message;
      this.isRead = isRead;
    }
  render() {
    return (this.message, this.isRead);
  }
}

export default Messages;
