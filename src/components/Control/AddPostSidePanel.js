import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../../assets/scss/main.scss';
import '../../assets/scss/sidepanel.scss';

class AddPostSidePanel extends Component {
  render() {
    return (
      <form className="instant-add-post">
        <h3>Add post instantly</h3>
        <div>
          <label htmlFor="group">Select group:</label>
          <select name="group">
            <option value="">dupa</option>
          </select>
        </div>
        <textarea rows="5" placeholder="Write something..."></textarea>
        <div className="aside-button-submit">
          <button type="submit">Add</button>
        </div>
      </form>
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
