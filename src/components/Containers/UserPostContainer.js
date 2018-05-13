import React, { Component } from 'react';
import { connect } from 'react-redux';
import Post from '../View/Post';
import LoadingSpinner from '../View/LoadingSpinner';
import API from '../../api.js';
import PropTypes from 'prop-types';

class UserPostContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {posts: [], ready: false};
  }

  componentWillMount() {
      API.get(`/user/posts/${this.props.user.id}`, { 'headers': { 'Authorization': localStorage.getItem("token")} })
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

  render () {
    const content = this.state.ready ? (
      <React.Fragment>
      <h1 className="text-marker">My recent activity:</h1>
      {
        this.state.posts.map((post, index) =>
          <Post content={post} key={index}/>
        )
      }
      </React.Fragment>
    ) : (
      <LoadingSpinner />
    )
    return (
      <React.Fragment>
        {content}
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.userDetails
  }
}

UserPostContainer.propTypes = {
  user: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(UserPostContainer);
