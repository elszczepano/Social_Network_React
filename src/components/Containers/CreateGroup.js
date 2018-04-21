import React, { Component } from 'react';
import Header from './Header';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import API from '../../api.js';
import '../../assets/scss/main.scss';
import '../../assets/scss/group/create.scss';

class CreateGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {icons: [], errMessage: [], created: false, redirectAfterCreateId: 0};
    this.formData = new FormData();
  }

  componentWillMount() {
    API.get('/icons', { 'headers': { 'Authorization': localStorage.getItem("token")} })
    .then(response => {
      response = response['data'];
      response = response.map(icon => ({
        id: icon.id,
        name: icon.name
      }));
      this.setState({
        icons: response
      })
    })
    .catch(error => {
      if(error.response) console.log(error.response['data']['message']);
      else console.log(error);
    });
  }

  handleChange = (event) => {
    this.formData.append([event.target.id], event.target.value);
  }

  getBackgroundImage = (event) => {
    this.formData.append('background_image', event.target.files[0]);
  }

  createGroup = (event) => {
    event.preventDefault();
    let messages = [];
    this.setState({
      created: false,
      errMessage: []
    });
    API({
      method: 'post',
      url: '/groups',
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

  render() {
    if(!this.props.loginStatus) return <Redirect to="/"/>
    if(this.state.created) return <Redirect to={`/group/${this.state.redirectAfterCreateId}`}/>
    return (
      <React.Fragment>
        <Header />
        <section className="create-group-contaner default-container">
          <h2 className="text-marker">Create new group:</h2>
          <form>
            <div className="create-group-fields">
              <label htmlFor="firstName">Group name<span className="warning-marker">*</span></label>
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
            <div className="create-group-button">
              <button type="submit" onClick={this.createGroup}>Create</button>
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
    user: state.userDetails,
    loginStatus: state.loginStatus
  }
}

CreateGroup.propTypes = {
  user: PropTypes.object.isRequired,
  loginStatus: PropTypes.bool.isRequired
}

export default connect(mapStateToProps)(CreateGroup);
