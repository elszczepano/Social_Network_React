
import React, { Component } from 'react';
import '../assets/scss/main.scss';
import '../assets/scss/addpost.scss';

class AddPost extends Component {
  meShortcut = {
    groups: {
      'IT Devs': 'rocket',
      'buy/sell Poland': 'camera-retro',
      'Memes': 'image',
      'Janusz Pol - workmates': 'money',
      'Fishing fanatics': 'ship',
      'Star Wars fans': 'rebel'
    }
  }
  render() {
    return (
      <div className="add-post-wrapper">
        <div>
        <h3>Write something:</h3>
        <select name="" id="">
        <option disabled>Choose group</option>
        {
          Object.keys(this.meShortcut.groups).map ((value, i) =>
          <option key={i} value="{value}">{value}</option>
          )
        }
        </select>
        </div>
        <textarea name="" id="" rows="8"></textarea>
        <button><span className="fa fa-pencil-square-o" aria-hidden="true"></span> Post</button>
      </div>
    );
  }
}

export default AddPost;
