import React, { Component } from 'react';
import AddPostSidePanel from '../Control/AddPostSidePanel';
import CreateGroupShort from '../Control/CreateGroupShort';
import '../../assets/scss/main.scss';
import '../../assets/scss/sidepanel.scss';

class SidePanel extends Component {
  render() {
    return (
      <aside>
        <CreateGroupShort />
        <AddPostSidePanel />
      </aside>
    );
  }
}

export default SidePanel;
