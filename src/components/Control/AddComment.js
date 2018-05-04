import React, { Component } from 'react';
import PropTypes from 'prop-types';
import API from '../../api.js';
import { connect } from 'react-redux';

class AddComment extends Component {
  constructor(props) {
    super(props);
    this.state = {content: ''}
  }

  updateContent = (event) => {
    this.setState({content: event.target.value});
  }
  
  handleSubmit = (event) => {
    if (event.key === 'Enter' && this.state.content !== '')  this.addComment()
  }

  addComment = () => {
    API.post('/comments',
    {
      content: this.state.content,
      post_id: this.props.postId,
      user_id: this.props.user.id
    },
    {
      'headers': { 'Authorization': localStorage.getItem("token")}
    })
    .then(() => {
      setTimeout(window.location.reload(), 100);
    })
    .catch(error => {
      if(error.response) console.log(error.response['data']['message']);
      else console.log(error);
    });
  }
  render() {
    return (
      <div className="add-comment">
        <strong>Add comment:</strong>
        <div>
          <input type="text" placeholder="Hit enter to add comment" onChange={this.updateContent} onKeyPress={this.handleSubmit} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.userDetails
  }
}

AddComment.propTypes = {
  user: PropTypes.object.isRequired,
  postId: PropTypes.number.isRequired
}


export default connect(mapStateToProps)(AddComment);
