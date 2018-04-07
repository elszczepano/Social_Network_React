import React from 'react';
import PropTypes from 'prop-types';

const GroupDetails = (props) => (
  <div>
    <div>
      <h3>{props.details.name}</h3>
    </div>
  </div>
);

GroupDetails.propTypes = {
  details: PropTypes.object.isRequired
}

export default GroupDetails;
