import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import HeaderLogin from './components/HeaderLogin';
import Footer from './components/Footer';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<HeaderLogin />, document.getElementById('login-header'));
ReactDOM.render(<Footer />, document.getElementById('footer'));
registerServiceWorker();
