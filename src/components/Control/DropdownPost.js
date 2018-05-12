import React, { Component } from 'react';
import API from '../../api.js';
import PropTypes from 'prop-types';
import '../../assets/scss/post/dropdownpost.scss';

class DropdownPost extends Component {
  constructor(props) {
    super(props);
    this.state = {isOpened: false, postDeleted: false};
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  setWrapperRef = node => {
    this.wrapperRef = node;
  }

  toggleDropdown = () => {
    this.setState(prevState => ({
      isOpened: !this.state.isOpened
    }));
  }

  handleClickOutside = event => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target) && this.state.isOpened) {
      this.toggleDropdown();
    }
  }

  deletePost = () => {
    API.delete(`/posts/${this.props.postId}`, { 'headers': { 'Authorization': localStorage.getItem("token")} })
    .then(() => {
      this.setState({
        postDeleted: true
      })
      setTimeout(window.location.reload(), 4000);
    })
    .catch(error => {
      if(error.response) console.log(error.response['data']['message']);
      else console.log(error);
    });
  }

  render() {
    return (
      <React.Fragment>
        { this.state.isOpened ? <div ref={this.setWrapperRef} className="dropdown-news-box">
          <ul className="text-marker">
            <li onClick={this.props.editPost}>Edit post</li>
            <li onClick={this.deletePost}>Delete post</li>
          </ul>
        </div> : '' }
      </React.Fragment>
    );
  }
}

DropdownPost.propTypes = {
  editPost: PropTypes.func.isRequired,
  postId: PropTypes.number.isRequired
}

export default DropdownPost;
