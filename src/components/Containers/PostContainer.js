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
        console.log(response);
        response = response.map(post => ({
          content: post.content,
          rating: post.rating,
          author: `${post.user.name} ${post.user.surname}`,
          authorAvatar: post.user.avatar,
          group: post.group.name
        }));
        this.setState({
          userPosts: response
        })
      })
    })
  }

  render () {
    return (
      <React.Fragment>
      <h1 className="text-marker">My recent activity:</h1>
      {
        this.state.userPosts.map((post, index) =>
          <Post content={post} key={index}/>
        )
      }
      </React.Fragment>
    );
  }
}

export default PostContainer;
