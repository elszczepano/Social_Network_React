import React, { Component } from 'react';
import '../../assets/scss/main.scss';
import '../../assets/scss/post/dropdownpost.scss';

class DropdownPost extends Component {
    constructor(props) {
      super(props);
      this.state = {isOpened: false};
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    setWrapperRef = (node) => {
        this.wrapperRef = node;
    }

    toggleDropdown = () => {
      this.setState(prevState => ({
        isOpened: !this.state.isOpened
      }));
    }

    handleClickOutside = (event) => {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target) && this.state.isOpened) {
          this.toggleDropdown();
        }
    }
  render() {
    return (
      <React.Fragment>
        { this.state.isOpened ? <div ref={this.setWrapperRef} className="dropdown-news-box">
          <ul className="text-marker">
            <li>Edit post</li>
            <li>Delete post</li>
          </ul>
        </div> : '' }
      </React.Fragment>
    );
  }
}

export default DropdownPost;
