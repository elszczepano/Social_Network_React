import React from 'react';
import PropTypes from 'prop-types';
import '../../assets/scss/main.scss';
import '../../assets/scss/group/groupdetails.scss';

const GroupDetails = (props) => (
  <div className="group-details-wrapper">
    <div className="group-background">
      <h3>{props.details.name}</h3>
    </div>
    <div>
      <h4>Description:</h4>
      <span className="fa fa-cog"></span>
    </div>
    <p>{props.details.description ? props.details.description : "This group does not have description yet."}</p>
  </div>
);

GroupDetails.propTypes = {
  details: PropTypes.object.isRequired
}

export default GroupDetails;
