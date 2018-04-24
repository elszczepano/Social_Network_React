import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import storageLink from '../../storageLink.js';
import LoadingSpinner from '../View/LoadingSpinner';
import '../../assets/scss/main.scss';
import '../../assets/scss/group/details.scss';

class GroupDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {ready: false};
  }

  componentWillReceiveProps() {
    this.setState({
      ready: true
    })
  }
  render () {
    const content = this.state.ready ? (
      <React.Fragment>
      <div className="group-details-container">
        {this.props.details.background_image ? <img className="background-image" src={`${storageLink}${this.props.details.background_image}`} alt={`${this.props.details.name} group avatar`}/> : ""}
        <h3>{this.props.details.name}</h3>
        <div>
          <h4>Description:</h4>
          <Link to={`/edit-group/${this.props.details.id}`}><span className="fa fa-cog"></span></Link>
        </div>
        <p>{this.props.details.description ? this.props.details.description : "This group does not have description yet."}</p>
      </div>
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

GroupDetails.propTypes = {
  details: PropTypes.object.isRequired
}

export default GroupDetails;
