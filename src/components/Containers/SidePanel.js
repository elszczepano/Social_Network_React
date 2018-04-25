import React from 'react';
import AddPostSidePanel from '../Control/AddPostSidePanel';
import CreateGroupShort from '../Control/CreateGroupShort';
import '../../assets/scss/sidepanel.scss';

const SidePanel = () => (
  <aside className="side-panel">
    <CreateGroupShort />
    <AddPostSidePanel />
  </aside>
);

export default SidePanel;
