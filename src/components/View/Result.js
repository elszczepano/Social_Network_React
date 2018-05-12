import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import classNames from 'classnames';
import API from '../../api.js';
import '../../assets/scss/group/search.scss';

class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {created: false}
  }
  createNewRequest = () => {
    API.post('/requests',
    {
      group_id: this.props.group.id,
      user_id: this.props.user.id
    },
    {
      'headers': { 'Authorization': localStorage.getItem("token")}
    })
    .then(this.setState({
      created: true
    }))
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
      <li className="result">
        <Link to={`/group/${this.props.group.id}`}>{this.props.group.name}</Link>
        <button className={buttonClass} onClick={this.createNewRequest} disabled={this.state.created}>{this.state.created ? 'Joined' : 'Join'}</button>
      </li>
    )
  }
}

Result.propTypes = {
  group: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    user: state.userDetails,
  }
}

export default connect(mapStateToProps)(Result);
