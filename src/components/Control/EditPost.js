import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import API from '../../api.js';
import '../../assets/scss/post/edit.scss';

class EditPost extends Component {
  constructor(props) {
    super(props);
    this.state = {content: this.props.content.content, updated: false}
  }

  updateContent = event => {
    this.setState({content: event.target.value});
  }

  updatePost = () => {
    if(!this.state.content || this.state.content === this.props.content.content) return;
    API.put(`/posts/${this.props.content.postId}`,
    {
      content: this.state.content
    },
    {
      'headers': { 'Authorization': localStorage.getItem("token")}
    })
    .then(() => {
      this.setState({updated: true});
      setTimeout(window.location.reload(), 4000);
    })
    .catch(error => {
      if(error.response) console.log(error.response['data']['message']);
      else console.log(error);
    });
  }

  render() {
    const buttonClass = classNames({
    'success-button': this.state.updated
    });
    const iconClass = classNames({
    'fa fa-check': this.state.updated,
    'fa fa-pencil-square-o': !this.state.updated
    });
    return (
    <div className="edit-post">
      <div className="edit-post-content">
        <textarea onChange={this.updateContent} defaultValue={this.props.content.content}></textarea>
      </div>
      <div className="edit-post-submit">
        <button className={buttonClass} onClick={this.updatePost}><span className={iconClass} aria-hidden="true"></span>{this.state.updated ? ' Updated' : ' Update'}</button>
      </div>
    </div>
    );
  }
}

EditPost.propTypes = {
  content: PropTypes.object.isRequired
}

export default EditPost;
