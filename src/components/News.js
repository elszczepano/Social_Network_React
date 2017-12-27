import React, { Component } from 'react';
import '../assets/scss/main.scss';
import '../assets/scss/news.scss';

class News extends Component {
  render() {
    return (
      <div className="news-container">
      <header>
      <img src="https://avatarfiles.alphacoders.com/855/85557.png" alt="User Name avatar"/>
      <span><strong><a href="">User Name</a></strong> <span className="fa fa-caret-right" aria-hidden="true"></span> <strong><a href="">Group Name</a></strong></span>
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
