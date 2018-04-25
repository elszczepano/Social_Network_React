import React, { Component } from 'react';
import Header from '../Containers/Header';
import classNames from 'classnames';
import API from '../../api.js';
import '../../assets/scss/group/forms.scss';

class EditGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {icons: [], errMessage: [], updated: false};
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

  render() {
    const messageClass = classNames({
    'success-marker': this.state.updated,
    'warning-marker': !this.state.updated
    });
    return (
      <React.Fragment>
        <Header />
        <section className="group-form-contaner default-container">
          <h2 className="text-marker">Edit your group:</h2>
          <p>Edit group information and click <span className="text-marker">update</span></p>
          <form>
            <div className="group-fields">
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
            <div className="group-button-multiple">
            <button type="submit">Update</button>
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

export default EditGroup;
