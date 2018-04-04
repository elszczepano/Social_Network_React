import React, { Component } from 'react';
import API from '../../api.js';
import '../../assets/scss/main.scss';
import '../../assets/scss/sidepanel/creategroup.scss';

class CreateGroupShort extends Component {
  constructor(props) {
    super(props);
    this.state = {icons: []};
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
      <form className="instant-create-group">
        <h3>Create group instantly</h3>
        <input placeholder="Group name" type="text"/>
        <div>
          <label htmlFor="icon">Select icon:</label>
          <select name="icon">
            {
              this.state.icons.map((icon, index) => {
                return <option key={index}>{icon.name}</option>
              })
            }
          </select>
        </div>
        <div className="instant-create-group-submit">
          <button type="submit">Create</button>
        </div>
      </form>
    );
  }
}

export default CreateGroupShort;
