import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import API from '../../api.js';
import '../../assets/scss/group/notamember.scss';

class NotAMember extends Component {
  constructor(props) {
    super(props);
    this.state = {created: false}
  }
  createNewRequest = () => {
    API.post('/requests',
    {
      group_id: this.props.id,
      user_id: this.props.user.id
    },
    {
      'headers': { 'Authorization': localStorage.getItem("token")}
    })
    .then(this.setState({created: true}))
    .catch(error => {
      if(error.response) console.log(error.response['data']['message']);
      else console.log(error);
    });
  }

  render() {
    const buttonClass = classNames({
    'success-button': this.state.created
    });
    return (
      <div className="info-container">
        <div>
          <div className="info">You are not a member of this group!</div>
          <div className="join-button">
              <button className={buttonClass} onClick={this.createNewRequest} disabled={this.state.created}>{this.state.created ? 'Joined' : 'Join'}</button>
          </div>
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

NotAMember.propTypes = {
  id: PropTypes.number.isRequired,
  user: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(NotAMember);
