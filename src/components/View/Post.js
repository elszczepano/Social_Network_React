import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DropdownNews from '../Control/DropdownNews';
import '../../assets/scss/main.scss';
import '../../assets/scss/post/post.scss';

class Post extends Component {
  constructor(props) {
      super(props);
      this.state = {showDropdown: false};
      this.handleDropdownClick = this.handleDropdownClick.bind(this);
    }
    handleDropdownClick() {
      this.setState(prevState => ({
        showDropdown: !prevState.showDropdown
      }));
    }

  render () {
    return (
      <div className="news-wrapper">
      <header>
        <div>
          <img src="https://avatarfiles.alphacoders.com/855/85557.png" alt="User Name avatar"/>
          <span><strong><a href="">User Name</a></strong> <span className="fa fa-caret-right" aria-hidden="true"></span> <strong><a href="">Group Name</a></strong></span>
        </div>
        <div className="dropdown-menu">
            <span onClick={this.handleDropdownClick} className="fa fa-cog"></span>
            { this.state.showDropdown ? <DropdownNews/> : null }
        </div>
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

Post.propTypes = {
  content: PropTypes.object
}

export default Post;
