import React, { Component } from 'react';
import Post from '../View/Post';
import AddPost from '../Control/AddPost';
import API from '../../api.js';
import PropTypes from 'prop-types';

class GroupPostContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {posts: []};
  }

  fetchGroupPosts = (id) => {
      API.get(`/group/posts/${id}`, { 'headers': { 'Authorization': localStorage.getItem("token")} })
      .then(response => {
        response = response['data'];
        response = response.map(post => ({
          content: post.content,
          rating: post.rating,
          author: `${post.user.name} ${post.user.surname}`,
          authorAvatar: post.user.avatar,
          authorId: post.user_id,
          group: post.group.name,
          groupId: post.group_id
        }));
        this.setState({
          posts: response
        })
      })
    .catch(error => {
      if(error.response) {
        const response = error.response['data']['message'];
        console.log(response);
      }
      else {
        console.log(error);
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    this.fetchGroupPosts(nextProps['details']['id']);
  }

  render () {
    return (
      <React.Fragment>
      <AddPost />
      <h1 className="text-marker">Group activity:</h1>
      {
        this.state.posts.map((post, index) =>
          <Post content={post} key={index}/>
        )
      }
      </React.Fragment>
    );
  }
}

GroupPostContainer.propTypes = {
  details: PropTypes.object.isRequired
}

export default GroupPostContainer;
