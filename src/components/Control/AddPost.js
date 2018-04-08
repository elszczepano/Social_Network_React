import React, { Component } from 'react';
import '../../assets/scss/main.scss';
import '../../assets/scss/post/addpost.scss';

class AddPost extends Component {
  render() {
    return (
      <div className="add-post-wrapper">
        <h3>Write something:</h3>
        <textarea name="" id="" rows="8" />
        <div>
          <button><span className="fa fa-pencil-square-o" aria-hidden="true"></span> Post</button>
        </div>
      </div>
    );
  }
}

export default AddPost;
