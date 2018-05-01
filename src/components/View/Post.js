import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import DropdownPost from '../Control/DropdownPost';
import Comment from './Comment';
import API from '../../api.js';
import storageLink from '../../storageLink.js';
import '../../assets/scss/post/post.scss';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {content: "", created: false, comments: []}
  }

  componentWillMount() {
    API.get(`post/comments/${this.props.content.postId}`, { 'headers': { 'Authorization': localStorage.getItem("token")} })
    .then(response => {
      response = response['data'];
      response = response.map(comment => ({
        id: comment.id,
        authorId: comment.user_id,
        author: comment.user.surname ? `${comment.user.name} ${comment.user.surname}` : comment.user.name,
        content: comment.content
      }));
      this.setState({
        comments: response
      })
    })
    .catch(error => {
      if(error.response) console.log(error.response['data']['message']);
      else console.log(error);
    });
  }

  render () {
    const edit = this.props.content.authorId === this.props.user.id ? (
      <div className="dropdown-menu">
          <span className="fa fa-cog" onClick={() => this.refs.dropdown.toggleDropdown()}></span>
          <DropdownPost ref="dropdown" />
      </div>
    ) : ("")
    return (
      <div className="post-container">
      <header>
        <div>
          <img src={`${storageLink}${this.props.content.authorAvatar}`} alt={`${this.props.content.author} avatar`}/>
          <span>
            <strong>
            <Link to={`/user/${this.props.content.authorId}`}>{this.props.content.author}</Link>
            </strong>
            <span className="fa fa-caret-right" aria-hidden="true"></span>
            <strong>
            <Link to={`/group/${this.props.content.groupId}`}>{this.props.content.group}</Link>
            </strong>
          </span>
        </div>
        {edit}
      </header>
      <div className="post-content-container">
        <p className="post-content">{this.props.content.content}</p>
      </div>
      <div className="post-actions">
        <div>
          <span className="fa fa-plus" aria-hidden="true"></span>
          <span className="fa fa-minus" aria-hidden="true"></span>
          <span className="fa fa-commenting" aria-hidden="true"></span>
        </div>
        <div>
          <span className="post-votes">{this.props.content.rating}</span>
        </div>
      </div>
      <div>
      {
        this.state.comments.map((comment, index) =>
          <Comment content={comment} key={index}/>
        )
      }
      </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.userDetails
  }
}

Post.propTypes = {
  content: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(Post);
