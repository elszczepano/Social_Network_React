import React, { Component } from 'react';
import '../assets/scss/main.scss';
import '../assets/scss/dropdownnews.scss';

class DropdownNews extends Component {
  render() {
    return (
        <div className="dropdown-news-box">
          <ul className="text-marker">
            <li>Edit post</li>
            <li>Delete post</li>
          </ul>
        </div>
    );
  }
}

export default DropdownNews;
