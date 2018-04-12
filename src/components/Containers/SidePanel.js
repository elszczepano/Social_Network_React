import React from 'react';
import AddPostSidePanel from '../Control/AddPostSidePanel';
import CreateGroupShort from '../Control/CreateGroupShort';
import '../../assets/scss/main.scss';
import '../../assets/scss/sidepanel.scss';

const SidePanel = () => (
  <aside>
    <CreateGroupShort />
    <AddPostSidePanel />
  </aside>
);

export default SidePanel;
