
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
      <div>
        <div>
        <h2>Write something:</h2>
        <select name="" id="">
        {
          Object.keys(this.meShortcut.groups).map ((value, i) =>
          <option key={i} value="{value}">{value}</option>
          )
        }
        </select>
        </div>
        <textarea name="" id="" cols="30" rows="10"></textarea>
        <button>Post</button>
      </div>
    );
  }
}

export default AddPost;
