import React, { Component } from 'react';
import Post from '../View/Post';
import AddPost from '../Control/AddPost';
import API from '../../api.js';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import '../../assets/scss/post/post.scss';

class GroupPostContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {posts: [], ready: false, users: [], deleted: false};
  }

  fetchUsers = id => {
    API.get(`/group/users/${id}`, { 'headers': { 'Authorization': localStorage.getItem("token")} })
    .then(response => {
      response = response['data'];
      this.setState({
        users: response
      });
    })
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

  leaveGroup = () => {
    for(let index in this.state.users) {
        if(this.state.users[index]['pivot']['user_id'] === this.props.user.id) {
          API.delete(`/user-groups/${this.state.users[index]['pivot']['id']}`, { 'headers': { 'Authorization': localStorage.getItem("token")} })
          .then(this.setState({
            deleted: true
          }))
          .catch(error => {
            if(error.response) console.log(error.response['data']['message']);
            else console.log(error);
          });
        }
      }
  }

  componentWillMount() {
    this.fetchGroupPosts(this.props.groupId);
    this.fetchUsers(this.props.groupId);
  }
  render () {
    if(this.state.deleted) return <Redirect to={`/feed`}/>
    return (
      <React.Fragment>
        <div className="leave-button">
          <button onClick={this.leaveGroup} className="warning-button">Leave <span className="fa fa-sign-out" aria-hidden="true"></span></button>
        </div>
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

function mapStateToProps(state) {
  return {
    loginStatus: state.loginStatus,
    groupId: state.currentGroup,
    user: state.userDetails
  }
}

GroupPostContainer.propTypes = {
  groupId: PropTypes.number.isRequired,
  details: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  loginStatus: PropTypes.bool.isRequired
}

export default connect(mapStateToProps)(GroupPostContainer);
