import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../../assets/scss/main.scss';
import '../../assets/scss/sidepanel/addpost.scss';

class AddPostSidePanel extends Component {
  render() {
    return (
      <div></div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.userDetails
  }
}

AddPostSidePanel.propTypes = {
  user: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(AddPostSidePanel);
