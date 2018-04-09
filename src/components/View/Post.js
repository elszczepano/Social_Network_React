import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
    ) : (
      ""
    )
    return (
      <div className="news-wrapper">
      <header>
        <div>
          <img src={this.props.content.authorAvatar} alt={`${this.props.content.author} avatar`}/>
          <span><strong><a href="">{this.props.content.author}</a></strong> <span className="fa fa-caret-right" aria-hidden="true"></span> <strong><a href="">{this.props.content.group}</a></strong></span>
        </div>
        {edit}
      </header>
      <section>
        <p className="news-content">{this.props.content.content}</p>
        <p className="news-votes">{this.props.content.rating}</p>
      </section>
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
