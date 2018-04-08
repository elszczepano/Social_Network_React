import React, { Component } from 'react';
import Post from '../View/Post';
import API from '../../api.js';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class UserPostContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {posts: []};
  }

  componentWillMount() {
      API.get(`/user/posts/${this.props.user.id}`, { 'headers': { 'Authorization': localStorage.getItem("token")} })
      .then(response => {
        response = response['data'];
        response = response.map(post => ({
          content: post.content,
          rating: post.rating,
          author: `${post.user.name} ${post.user.surname}`,
          authorAvatar: post.user.avatar,
          group: post.group.name
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

  render () {
    return (
      <React.Fragment>
      <h1 className="text-marker">My recent activity:</h1>
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
    user: state.userDetails
  }
}

UserPostContainer.propTypes = {
  user: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(UserPostContainer);
