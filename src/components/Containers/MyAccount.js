import React, { Component } from 'react';
import Header from '../Containers/Header';
import DeleteUser from '../Control/DeleteUser';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import API from '../../api.js';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { getDetails } from '../../actions/userDetails.actions';
import '../../assets/scss/user/myaccount.scss';

class MyAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {errMessage: [], updated: false, showDelete: false};
    this.formData = new FormData();
  }

  handleChange = event => {
    this.formData.append([event.target.id], event.target.value);
  }

  togglePasswordVisibility = () => {
    if(this.refs.password.type === 'password') this.refs.password.type = 'text'
    else this.refs.password.type = 'password'
  }

  getAvatar = event => {
    this.formData.append('avatar', event.target.files[0]);
  }

  updateUserDetails = event => {
    event.preventDefault();
    let messages = [];
    this.formData.append('_method', 'PUT');
    this.setState({
      updated: false,
      errMessage: []
    });
    API({
      method: 'post',
      url: `/users/${this.props.user.id}`,
      data: this.formData,
      headers: {
        'Authorization': localStorage.getItem("token"),
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      if(response['data']['error']) {
        const responseMessage = response['data']['message'];
        Object.keys(responseMessage).forEach((key) => {
          messages.push(responseMessage[key].toString());
        })
        this.setState({errMessage: messages});
        return;
      }
      this.props.dispatch(getDetails(response['data']['data']));
      this.setState({
        updated: true,
        errMessage: ["Data updated successfully"]
      });
      this.forceUpdate();
    })
    .catch(error => {
      if(error.response) console.log(error.response['data']['message']);
      else console.log(error);
    });
  }

  handleDeleteClick = event => {
    event.preventDefault();
    this.setState({
      showDelete: !this.state.showDelete
    });
  }

  render() {
    const messageClass = classNames({
    'success-marker': this.state.updated,
    'warning-marker': !this.state.updated
    });
    if(!this.props.loginStatus) return <Redirect to="/"/>
    return (
      <React.Fragment>
      { this.state.showDelete ? <DeleteUser deleteVisibility={this.handleDeleteClick} /> : '' }
        <Header />
        <section className="edit-account-contaner default-container">
          <h2 className="text-marker">Edit account details</h2>
          <p>Edit your personal information and click <span className="text-marker">update</span></p>
          <form>
            <div className="edit-account-fields">
              <label htmlFor="firstName">First name</label>
              <input id="name" name="firstName" type="text" onChange={this.handleChange} defaultValue={this.props.user.name} />
              <label htmlFor="lastName">Last name</label>
              <input id="surname" name="lastName" type="text" onChange={this.handleChange} defaultValue={this.props.user.surname}/>
              <label htmlFor="description">Bio</label>
              <textarea id="description" name="description" onChange={this.handleChange} defaultValue={this.props.user.description}></textarea>
              <label htmlFor="birth">Birth date</label>
              <input id="birth_date" name="birth" type="date" onChange={this.handleChange} defaultValue={this.props.user.birth_date}/>
              <label htmlFor="email">E-Mail Address</label>
              <input id="email" name="email" type="email" onChange={this.handleChange} defaultValue={this.props.user.email}/>
              <label htmlFor="avatar">Avatar</label>
              <input id="avatar" name="avatar" type="file" onChange={this.getAvatar} defaultValue={this.props.user.avatar} accept=".jpg, .jpeg, .png"/>
              <label htmlFor="password">New password</label>
                <div className="eye-handler">
                  <input ref="password" id="password" name="password" onChange={this.handleChange} type="password"/>
                  <span onClick={this.togglePasswordVisibility} className="fa fa-eye"></span>
                </div>
            </div>
            <div className="error-message-box">
            {
              this.state.errMessage.map((value) =>
                <p className={messageClass} key={value.toString()}>{value}</p>
              )
            }
            </div>
            <div className="edit-account-buttons">
              <button type="submit" onClick={this.updateUserDetails}>Update</button>
              <button className="warning-button" onClick={this.handleDeleteClick}>Delete account</button>
            </div>
          </form>
        </section>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.userDetails,
    loginStatus: state.loginStatus
  }
}

MyAccount.propTypes = {
  user: PropTypes.object.isRequired,
  loginStatus: PropTypes.bool.isRequired
}

export default connect(mapStateToProps)(MyAccount);
