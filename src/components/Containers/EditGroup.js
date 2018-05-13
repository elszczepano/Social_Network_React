import React, { Component } from 'react';
import Header from '../Containers/Header';
import { Redirect } from 'react-router';
import API from '../../api.js';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../../assets/scss/group/forms.scss';

class EditGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {adminId: 0, icons: [], errMessage: [], updated: false, groupId: this.props['match']['params']['id'], kickUser: false};
    this.formData = new FormData();
  }

  componentWillMount() {
    API.get(`/group/users/${this.state.groupId}`, { 'headers': { 'Authorization': localStorage.getItem("token")} })
    .then(response => {
      response = response['data'];
      for(let index in response) {
          if(response[index]['role'][0]['name'] === "Admin") {
            this.setState({adminId: response[index]['id']});
          }
        }
    })
    .then(() => {
      if(this.state.adminId !== this.props.user.id) {
        this.setState({kickUser: true});
      }
    })
    .then(() => {
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
    })
  }

  handleChange = event => {
    this.formData.append([event.target.id], event.target.value);
  }

  getBackgroundImage = event => {
    this.formData.append('background_image', event.target.files[0]);
  }

  updateGroupDetails = event => {
    event.preventDefault();
    let messages = [];
    this.formData.append('_method', 'PUT');
    this.setState({
      updated: false,
      errMessage: []
    });
    API({
      method: 'post',
      url: `/groups/${this.state.groupId}`,
      data: this.formData,
      headers: {
        'Authorization': localStorage.getItem("token"),
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      if(response['data']['error']) {
        const responseMessage = response['data']['message'];
        Object.keys(responseMessage).forEach((key) => {
          messages.push(responseMessage[key].toString());
        })
        this.setState({errMessage: messages});
        return;
      }
      this.setState({updated: true});
    })
    .catch(error => {
      if(error.response) console.log(error.response['data']['message']);
      else console.log(error);
    });
  }

  render() {
    if(this.state.updated) return <Redirect to={`/group/${this.state.groupId}`}/>
    if(this.state.kickUser) return <Redirect to={`/feed`}/>
    return (
      <React.Fragment>
        <Header />
        <section className="group-form-contaner default-container">
          <h2 className="text-marker">Edit your group:</h2>
          <p>Edit group information and click <span className="text-marker">update</span></p>
          <form>
            <div className="group-fields">
              <label htmlFor="firstName">Group name</label>
              <input id="name" name="name" type="text" onChange={this.handleChange}/>
              <label htmlFor="description">Description</label>
              <textarea name="description" id="description" onChange={this.handleChange}></textarea>
              <label htmlFor="backgroundImage">Background image</label>
              <input id="backgroundImage" name="backgroundImage" onChange={this.getBackgroundImage} type="file" accept=".jpg, .jpeg, .png"/>
              <label htmlFor="backgroundImage">Icon</label>
              <select onChange={this.handleChange} id="icon_id" name="icon">
                {
                  this.state.icons.map((icon, index) => {
                    return <option value={icon.id} key={index}>{icon.name}</option>
                  })
                }
              </select>
            </div>
            <div className="group-button-multiple">
            <button onClick={this.updateGroupDetails} type="submit">Update</button>
            <button className="warning-button">Delete group</button>
            </div>
            <div className="error-message-box">
            {
              this.state.errMessage.map((value) =>
                <p className="warning-marker" key={value.toString()}>{value}</p>
              )
            }
            </div>
          </form>
        </section>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.userDetails
  }
}

 EditGroup.propTypes = {
  user: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(EditGroup);
