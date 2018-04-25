import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import '../../assets/scss/group/search.scss';

const Result = (props) => (
  <li className="result">
    <Link to={`/group/${props.group.id}`}>{props.group.name}</Link>
    <button>Join</button>
  </li>
);

Result.propTypes = {
  group: PropTypes.object.isRequired
}

export default Result;
