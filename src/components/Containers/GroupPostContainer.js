import React, { Component } from 'react';
import Post from '../View/Post';
import AddPost from '../Control/AddPost';
import API from '../../api.js';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class GroupPostContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {posts: [], ready: false};
  }

  fetchGroupPosts = id => {
      API.get(`/group/posts/${id}`, { 'headers': { 'Authorization': localStorage.getItem("token")} })
      .then(response => {
        response = response['data'];
        response = response.map(post => ({
          postId: post.id,
          content: post.content,
          rating: post.rating,
          author: post.user.surname ? `${post.user.name} ${post.user.surname}` : post.user.name,
          authorAvatar: post.user.avatar,
          authorId: post.user_id,
          group: post.group.name,
          groupId: post.group_id
        }));
        this.setState({
          posts: response,
          ready: true
        })
      })
    .catch(error => {
      if(error.response) console.log(error.response['data']['message']);
      else console.log(error);
    });
  }

  componentWillMount() {
    this.fetchGroupPosts(this.props.groupId);
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
  groupId: PropTypes.number.isRequired,
  details: PropTypes.object.isRequired,
  loginStatus: PropTypes.bool.isRequired
}

function mapStateToProps(state) {
  return {
    loginStatus: state.loginStatus,
    groupId: state.currentGroup
  }
}

export default connect(mapStateToProps)(GroupPostContainer);
