import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import API from '../../api.js';
import '../../assets/scss/main.scss';
import '../../assets/scss/post/addpost.scss';

class AddPost extends Component {
  constructor(props) {
    super(props);
    this.state = {content: ""}
  }

  updateContent = (event) => {
    this.setState({
      content: event.target.value
    });
  }
  addPost = () => {
    if(this.state.content) {
      API.post('/posts',
      {
        content: this.state.content,
        group_id: this.props.id,
        user_id: this.props.user.id
      },
      {
        'headers': { 'Authorization': localStorage.getItem("token")}
      })
      .catch(error => {
        if(error.response) console.log(error.response['data']['message']);
        else console.log(error);
      });
    }
  }

  render() {
    return (
      <div className="add-post-container">
        <h3>Write something:</h3>
        <textarea onChange={this.updateContent} rows="8" />
        <div>
          <button onClick={this.addPost}><span className="fa fa-pencil-square-o" aria-hidden="true"></span> Post</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    id: state.currentGroup,
    user: state.userDetails
  }
}

AddPost.propTypes = {
  id: PropTypes.number.isRequired
}

export default connect(mapStateToProps)(AddPost);
