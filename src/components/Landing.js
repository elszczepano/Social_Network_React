import React, { Component } from 'react';
import Footer from './Footer';
import Register from './Register';
import '../assets/scss/main.scss';
import '../assets/scss/header.scss';
import '../assets/scss/landing.scss';

class Landing extends Component {

  constructor(props) {
      super(props);
      this.state = {showRegister: false};

      // This binding is necessary to make `this` work in the callback
      this.handleRegisterClick = this.handleRegisterClick.bind(this);
    }

    handleRegisterClick() {
      this.setState(prevState => ({
        showRegister: !prevState.showRegister
      }));
    }
  render() {
    return (
      <div className="landing-container">
      { this.state.showRegister ? <Register registerVisibility={this.handleRegisterClick} /> : null }
        <header className="main-page-header">
          <div className="logo">
            <h1>Groupeé</h1>
          </div>
          <div>
            <ul>
              <li><input type="text" placeholder="Username"/></li>
              <li><input type="password" placeholder="Password"/></li>
              <li><button>Sign In</button></li>
              <li onClick={this.handleRegisterClick}><span>new? register now</span></li>
            </ul>
          </div>
        </header>
        <div className="bg-welcome">
          <div className="welcome-content">
            <p>Groupeé is gathering people with common goals and interests.</p>
            <button>Join now!</button>
          </div>
        </div>
        <div className="features-box">
          <h2>A network with over <span className="text-marker">900 000</span> users and <span className="text-marker">170 000</span> groups.</h2>
          <h3>Fast. Realiable. Safe.</h3>
          <div className="features">
            <div>
              <div className="feature feature-friends"></div>
              <h4>Friends</h4>
            </div>
            <div>
              <div className="feature feature-work"></div>
              <h4>Work</h4>
            </div>
            <div>
              <div className="feature feature-meeting"></div>
              <h4>Meeting</h4>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Landing;
