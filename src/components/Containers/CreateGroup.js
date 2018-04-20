import React, { Component } from 'react';
import Header from './Header';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import API from '../../api.js';
import '../../assets/scss/main.scss';
import '../../assets/scss/group/create.scss';


class CreateGroup extends Component {
  render() {
    if(!this.props.loginStatus) return <Redirect to="/"/>
    return (
      <React.Fragment>
        <Header />
        <section className="create-group-contaner default-container">
          <h2 className="text-marker">Create new group:</h2>
          <form>
            <div className="create-group-fields">
              <label htmlFor="firstName">Group name<span className="warning-marker">*</span></label>
              <input id="name" name="name" type="text" required/>
              <label htmlFor="description">Description</label>
              <textarea name="description" id="description"></textarea>
              <label htmlFor="backgroundImage">Background image</label>
              <input id="backgroundImage" name="backgroundImage" type="file" accept=".jpg, .jpeg, .png"/>
              <label htmlFor="backgroundImage">Icon</label>
              <select name="" id="">
                <option value=""></option>
              </select>
            </div>
            <div className="create-group-button ">
              <button type="submit">Update</button>
            </div>
          </form>
        </section>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.userDetails,
    loginStatus: state.loginStatus
  }
}

CreateGroup.propTypes = {
  user: PropTypes.object.isRequired,
  loginStatus: PropTypes.bool.isRequired
}

export default connect(mapStateToProps)(CreateGroup);
