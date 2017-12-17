import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import Footer from './components/Footer';
import Landing from './components/Landing';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Landing />, document.getElementById('root'));
ReactDOM.render(<Footer />, document.getElementById('footer'));
registerServiceWorker();
