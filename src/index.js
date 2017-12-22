import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import Landing from './components/Landing';
//import UserAccount from './components/UserAccount';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Landing />, document.getElementById('root'));
//ReactDOM.render(<UserAccount />, document.getElementById('root'));
registerServiceWorker();
