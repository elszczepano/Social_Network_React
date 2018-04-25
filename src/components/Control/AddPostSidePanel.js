import React, { Component } from 'react';
import PropTypes from 'prop-types';
import API from '../../api.js';
import { connect } from 'react-redux';
import '../../assets/scss/sidepanel.scss';

class AddPostSidePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {groups: [], group: 0, content: ""};
  }
  componentWillMount() {
      API.get(`/user/groups/${this.props.user.id}`, { 'headers': { 'Authorization': localStorage.getItem("token")} })
      .then(response => {
        response = response['data'];
        response = response.map(group => ({
          name: group.name,
          id: group.id
        }));
        this.setState({
          groups: response
        })
      })
    .catch(error => {
      if(error.response) console.log(error.response['data']['message']);
      else console.log(error);
    });
  }

  handleChange = (event) => {
    this.setState({[event.target.id]: event.target.value});
  }

  addPost = (event) => {
    event.preventDefault();

    if(this.state.content&&this.state.group) {
      API.post('/posts',
      {
        content: this.state.content,
        group_id: this.state.group,
        user_id: this.props.user.id
      },
      {
        'headers': { 'Authorization': localStorage.getItem("token")}
      })
      .catch(error => {
        if(error.response) console.log(error.response['data']['message']);
        else console.log(error);
      });
    }
  }
  render() {
    return (
      <form className="instant-add-post">
        <h3>Add post instantly</h3>
        <div>
          <label htmlFor="group">Select group:</label>
          <select id="group" onChange={this.handleChange} name="group">
            <option value="0">Choose group</option>
          {
            this.state.groups.map((group) => {
              return <option value={group.id} key={group.id}>{group.name}</option>
            })
          }
          </select>
        </div>
        <textarea id="content" onChange={this.handleChange} rows="5" placeholder="Write something..."></textarea>
        <div className="aside-button-submit">
          <button type="submit" onClick={this.addPost}>Add</button>
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
