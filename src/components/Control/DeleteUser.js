import React, { Component } from 'react';
import PropTypes from 'prop-types';
import API from '../../api.js';
import { connect } from 'react-redux';
import { signOut } from '../../actions/login.actions';
import { removeDetails } from '../../actions/userDetails.actions';
import '../../assets/scss/user/myaccount.scss';

class DeleteUser extends Component {
  constructor(props) {
    super(props);
    this.state = {leaveReason: ""};
  }

  updateLeaveReason = (event) => {
    this.setState({leaveReason: event.target.value});
  }

  deleteUser = () => {
    API.put(`/users/${this.props.user.id}`,
    {
      leave_reason: this.state.leaveReason
    },
    {
      'headers': { 'Authorization': localStorage.getItem("token")}
    })
    .then(response => {
      API.delete(`users/${this.props.user.id}`, { 'headers': { 'Authorization': localStorage.getItem("token")} })
      localStorage.removeItem('token');
      this.props.dispatch(signOut());
      this.props.dispatch(removeDetails());
    })
    .catch(error => {
      if(error.response) console.log(error.response['data']['message']);
      else console.log(error);
    });

  }

  render() {
    return (
      <div className="modal-container">
        <div className="modal-content">
          <div className="modal-header">
            <span onClick={this.props.deleteVisibility} className="fa fa-times" aria-hidden="true"></span>
          </div>
            <div className="modal-body">
              <h2>Are you sure?</h2>
              <p>This action will <strong className="text-marker">PERMAMENTLY</strong> delete your account!</p>
              <textarea onChange={this.updateLeaveReason} className="delete-textarea" placeholder="Please tell us why you leaving us" name="leaveReason" id="leaveReason"></textarea>
            </div>
            <div className="modal-footer">
              <button onClick={this.deleteUser} type="submit" className="warning-button">Delete</button>
            </div>
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

DeleteUser.propTypes = {
  user: PropTypes.object.isRequired
}


export default connect(mapStateToProps)(DeleteUser);
