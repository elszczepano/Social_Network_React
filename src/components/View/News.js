import React, { Component } from 'react';
import DropdownNews from './DropdownNews';
import '../assets/scss/main.scss';
import '../assets/scss/news.scss';

class News extends Component {

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
        <p className="news-content">Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Magni numquam maiores odit eveniet, vero laboriosam inventore nemo iste, sed commodi, obcaecati totam modi blanditiis doloribus!
        Consectetur animi temporibus, laudantium ipsa!</p>
        <p className="news-votes">21</p>
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

export default News;
