import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { signOut } from '../../actions/login.actions';
import { removeDetails } from '../../actions/userDetails.actions';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import API from '../../api.js';
import LoadingSpinner from './LoadingSpinner';
import storageLink from '../../storageLink.js';
import '../../assets/scss/user/usershortcut.scss';

class UserShortcut extends Component {
  constructor(props) {
    super(props);
    this.state = {id: "", name: "", surname: "", avatar: "", groups: [], ready: false};
  }
  componentWillMount() {
      API.get(`/user/groups/${this.props.user.id}`, { 'headers': { 'Authorization': localStorage.getItem("token")} })
      .then(response => {
        response = response['data'];
        response = response.map(group => ({
          name: group.name,
          icon: group.icon.name,
          id: group.id
        }));
        this.setState({
          groups: response,
          ready: true
        })
      })
    .catch(error => {
      if(error.response) console.log(error.response['data']['message']);
      else console.log(error);
      this.props.dispatch(signOut());
      this.props.dispatch(removeDetails());
    });
  }
  render() {
    const content = this.state.ready ? (
      <React.Fragment>
      <div className="account-shortcut">
        <img src={`${storageLink}${this.props.user.avatar}`} alt={`${this.props.user.name} ${this.props.user.surname} avatar`}/>
        <h3>{this.props.user.name} {this.props.user.surname}</h3>
      </div>
      <h3>Browse groups:</h3>
      <div className="groups-shortcut">
        <ul>
        {
          this.state.groups.map((group, index) => {
            return (
              <li key={index}>
                <Link to={`/group/${group.id}`}>
                  <span className="group-name">{group.name}</span>
                  <span className={`fa fa-${group.icon}`}></span>
                </Link>
              </li>
            )
          })
        }
        </ul>
      </div>
      </React.Fragment>
    ) : (
      <LoadingSpinner />
    )
    return (
      <aside className="user-shortcuts">
      {content}
      </aside>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.userDetails
  }
}

UserShortcut.propTypes = {
  user: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(UserShortcut);
