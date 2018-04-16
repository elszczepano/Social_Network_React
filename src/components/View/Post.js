import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import DropdownPost from '../Control/DropdownPost';
import '../../assets/scss/main.scss';
import '../../assets/scss/post/post.scss';

class Post extends Component {
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
          <img src={`http://localhost:8000/storage/${this.props.content.authorAvatar}`} alt={`${this.props.content.author} avatar`}/>
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
        <p className="post-votes">{this.props.content.rating}</p>
      </div>
      <footer>
        <span className="fa fa-plus" aria-hidden="true"></span>
        <span className="fa fa-minus" aria-hidden="true"></span>
        <span className="fa fa-commenting" aria-hidden="true"></span>
      </footer>
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
