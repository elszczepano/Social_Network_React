import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import API from '../../api.js';
import '../../assets/scss/post/addpost.scss';

class AddPost extends Component {
  constructor(props) {
    super(props);
    this.state = {content: "", created: false}
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
      .then(() => {
        this.setState({
          created: true
        })
        setTimeout(window.location.reload(), 4000);
      })
      .catch(error => {
        if(error.response) console.log(error.response['data']['message']);
        else console.log(error);
      });
    }
  }

  render() {
    const buttonClass = classNames({
    'success-button': this.state.created
    });
    const iconClass = classNames({
    'fa fa-check': this.state.created,
    'fa fa-pencil-square-o': !this.state.created
    });
    return (
      <div className="add-post-container">
        <h3>Write something:</h3>
        <textarea onChange={this.updateContent} rows="8" />
        <div>
          <button className={buttonClass} onClick={this.addPost} disabled={this.state.created}><span className={iconClass} aria-hidden="true"></span>{this.state.created ? ' Posted' : ' Post'}</button>
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
  id: PropTypes.number.isRequired,
  user: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(AddPost);
