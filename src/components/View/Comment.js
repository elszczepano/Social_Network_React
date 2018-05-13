import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../../assets/scss/post/comment.scss';

class Comment extends Component {
  render() {
    return (
      <div className="comment-container">
      <Link to={`/user/${this.props.content.authorId}`}><strong className="text-marker">{this.props.content.author}</strong></Link>
      <span> {this.props.content.content}</span>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.userDetails
  }
}

Comment.propTypes = {
  user: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(Comment);
