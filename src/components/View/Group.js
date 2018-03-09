import React, { Component } from 'react';
import '../../assets/scss/main.scss';
import '../../assets/scss/group/group.scss';

class Group extends Component {
  groupDetails = {
    name: 'Fishing Fanatics',
    members: '5029',
    administrator: 'John Doe',
    icon: 'ship',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta doloremque sit obcaecati dolorum nesciunt quo beatae minus quas, quidem, sapiente aliquam numquam. ',
    createdAt: '2017-11-26'
  }
  render() {
    return (
      <div className="group-info-wrapper">
        <h2 className="text-marker"> <span className={`fa fa-${this.groupDetails.icon}`}></span> {this.groupDetails.name}</h2>
        <ul>
          <li>Administrator: {this.groupDetails.administrator}</li>
          <li>Members: {this.groupDetails.members}</li>
          <li>Created at: {this.groupDetails.createdAt}</li>
          <li><span className="fa fa-pencil"></span> Edit group</li>
        </ul>
        <h3>About {this.groupDetails.name}:</h3>
        <p>{this.groupDetails.description}</p>
      </div>
    );
  }
}

export default Group;
