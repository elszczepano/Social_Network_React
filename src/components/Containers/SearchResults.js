import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import Header from './Header';
import Result from '../View/Result';
import UserShortcut from '../View/UserShortcut';
import API from '../../api.js';
import PropTypes from 'prop-types';
import '../../assets/scss/group/searchresults.scss';

class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {groups: []}
  }
  componentDidMount() {
    API.get(`search/group?name=${this.props['match']['params']['name']}`, { 'headers': { 'Authorization': localStorage.getItem("token")} })
    .then(response => {
      response = response['data'];
      response = response.map(notification => notification);
      this.setState({groups: response});
    })
    .catch(error => {
      if(error.response) console.log(error.response['data']['message']);
      else console.log(error);
    });
  }
  render() {
    if(!this.props.loginStatus) return <Redirect to="/"/>
    return (
      <React.Fragment>
      <Header />
      <div className="default-grid default-container">
        <UserShortcut />
        <section className="results-container">
          <h2>Searching results for: <span className="text-marker">{this.props['match']['params']['name']}</span></h2>
          {!this.state.groups.length ? <p>No results. <span className="fa fa-frown-o" aria-hidden="true"></span></p> : ''}
          <ul>
          {
            this.state.groups.map((group, index) =>
              <Result group={group} key={index}/>
            )
          }
          </ul>
        </section>
      </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    loginStatus: state.loginStatus
  }
}

SearchResults.propTypes = {
  loginStatus: PropTypes.bool.isRequired
}

export default connect(mapStateToProps)(SearchResults);
