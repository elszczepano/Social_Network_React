import React, { Component } from 'react';
import API from '../../api.js';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import '../../assets/scss/sidepanel.scss';

class CreateGroupShort extends Component {
  constructor(props) {
    super(props);
    this.state = {icons: [], name: "", icon: 1, created: false, redirectAfterCreateId: 0};
  }

  componentWillMount() {
    API.get('/icons', { 'headers': { 'Authorization': localStorage.getItem("token")} })
    .then(response => {
      response = response['data'];
      response = response.map(icon => ({
        id: icon.id,
        name: icon.name
      }));
      this.setState({icons: response});
    })
    .catch(error => {
      if(error.response) console.log(error.response['data']['message']);
      else console.log(error);
    });
  }

  handleChange = event => {
    this.setState({[event.target.id]: event.target.value});
  }

  createGroup = event => {
    event.preventDefault();
    if(this.state.name) {
      API.post('/groups',
      {
        name: this.state.name,
        icon_id: this.state.icon
      },
      {
        'headers': { 'Authorization': localStorage.getItem("token")}
      })
      .then(response => {
        const groupId = response['data']['data']['id'];
        API.post('/user-groups',
        {
          user_id: this.props.user.id,
          group_id: groupId,
          role_id: 1
        },
        {
          'headers': { 'Authorization': localStorage.getItem("token")}
        })
        this.setState({
          created: true,
          redirectAfterCreateId: groupId
        });
      })
      .catch(error => {
        if(error.response) console.log(error.response['data']['message']);
        else console.log(error);
      });
    }
  }
  render() {
    if(this.state.created) return <Redirect to={`/group/${this.state.redirectAfterCreateId}`}/>
    return (
      <form className="instant-create-group">
        <h3>Create group instantly</h3>
        <input id="name" onChange={this.handleChange} placeholder="Group name" type="text"/>
        <div>
          <label htmlFor="icon">Select icon:</label>
          <select onChange={this.handleChange} id="icon" name="icon">
            {
              this.state.icons.map((icon, index) => {
                return <option value={icon.id} key={index}>{icon.name}</option>
              })
            }
          </select>
        </div>
        <div className="aside-button-submit">
          <button type="submit" onClick={this.createGroup}>Create</button>
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

CreateGroupShort.propTypes = {
  user: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(CreateGroupShort);
