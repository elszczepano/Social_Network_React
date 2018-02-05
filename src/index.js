import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
//import Landing from './components/Landing';
//import UserAccount from './components/UserAccount';
//import NotificationBox from './components/NotificationBox';
import NewsFeed from './components/NewsFeed';
//import GroupAdmin from './components/GroupAdmin';
//import EditAccountDetails from './components/EditAccountDetails';
import registerServiceWorker from './registerServiceWorker';

//ReactDOM.render(<Landing />, document.getElementById('root'));
//ReactDOM.render(<UserAccount />, document.getElementById('root'));
ReactDOM.render(<NewsFeed />, document.getElementById('root'));
//ReactDOM.render(<NotificationBox />, document.getElementById('root'));
//ReactDOM.render(<GroupAdmin />, document.getElementById('root'));
//ReactDOM.render(<EditAccountDetails />, document.getElementById('root'));
registerServiceWorker();
