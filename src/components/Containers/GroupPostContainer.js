import React, { Component } from 'react';
import Post from '../View/Post';
import AddPost from '../Control/AddPost';
import NotAMember from '../Control/NotAMember';
import LoadingSpinner from '../View/LoadingSpinner';
import API from '../../api.js';

import { connect } from 'react-redux';
import { setId, removeId } from '../../actions/currentGroup.actions';
import PropTypes from 'prop-types';

class GroupPostContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {posts: [], ready: false, displayContent: false};
  }

  fetchMembers = (id) => {
    API.get(`/group/users/${id}`, { 'headers': { 'Authorization': localStorage.getItem("token")} })
    .then(response => {
      response = response['data'];
      response = response.map(item => item.id);
      for(let index in response) {
          if(response[index] === this.props.user.id) {
            this.setState({
              displayContent: true
            });
          }
        }
    })
    .catch(error => {
      if(error.response) console.log(error.response['data']['message']);
      else console.log(error);
    });
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

  componentWillReceiveProps(nextProps) {
    const id = nextProps['details']['id'];
    this.fetchGroupPosts(id);
    this.fetchMembers(id);
    this.props.dispatch(setId(id));
  }

  componentWillUnmount() {
    this.props.dispatch(removeId());
  }
  render () {
    const checkMembership = this.state.displayContent ? (
      <React.Fragment>
      <AddPost />
      <h1 className="text-marker">Group activity:</h1>
      {
        this.state.posts.map((post, index) =>
          <Post content={post} key={index}/>
        )
      }
      </React.Fragment>
    ) : (
      <NotAMember />
    )
    return (
      <React.Fragment>
        {checkMembership}
      </React.Fragment>
    );
  }
}

GroupPostContainer.propTypes = {
  groupId: PropTypes.number.isRequired,
  details: PropTypes.object.isRequired,
  loginStatus: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    loginStatus: state.loginStatus,
    groupId: state.currentGroup,
    user: state.userDetails
  }
}

export default connect(mapStateToProps)(GroupPostContainer);
