import React, { Component } from 'react';
import Post from '../View/Post';
import API from '../../api.js';

class PostContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {userPosts: []};
  }

  componentWillMount() {
    API.get('/me', { 'headers': { 'Authorization': localStorage.getItem("token")} })
    .then(response => response['data']['id'])
    .then(id => {
      API.get(`/user/posts/${id}`, { 'headers': { 'Authorization': localStorage.getItem("token")} })
      .then(response => {
        response = response['data'];
        response = response.map(post => post);
        this.setState({
          userPosts: response
        })
      })
    })
  }

  render () {
    return (
      <React.Fragment>
      {
        this.state.userPosts.map(post =>
          <Post content={post}/>
        )
      }
      </React.Fragment>
    );
  }
}

export default PostContainer;
