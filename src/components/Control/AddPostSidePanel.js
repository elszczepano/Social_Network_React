import React, { Component } from 'react';
import PropTypes from 'prop-types';
import API from '../../api.js';
import { connect } from 'react-redux';
import '../../assets/scss/main.scss';
import '../../assets/scss/sidepanel.scss';

class AddPostSidePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {groups: []};
  }
  componentWillMount() {
      API.get(`/user/groups/${this.props.user.id}`, { 'headers': { 'Authorization': localStorage.getItem("token")} })
      .then(response => {
        response = response['data'];
        response = response.map(group => ({
          name: group.name,
          id: group.icon.id
        }));
        this.setState({
          groups: response
        })
      })
    .catch(error => {
      if(error.response) {
        const response = error.response['data']['message'];
        console.log(response);
      }
      else {
        console.log(error);
      }
    });
  }
  render() {
    return (
      <form className="instant-add-post">
        <h3>Add post instantly</h3>
        <div>
          <label htmlFor="group">Select group:</label>
          <select name="group">
          {
            this.state.groups.map((group) => {
              return <option value={group.id} key={group.id}>{group.name}</option>
            })
          }
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
