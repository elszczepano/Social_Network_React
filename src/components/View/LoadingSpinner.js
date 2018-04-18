import React from 'react';
import '../../assets/scss/main.scss';
import '../../assets/scss/spinner.scss';

const LoadingSpinner = (props) => (
  <div className="loading-spinner-container">
    <span class="fa fa-spinner fa-spin fa-3x fa-fw"></span>
    <span class="sr-only">Loading...</span>
  </div>
);

export default LoadingSpinner;
