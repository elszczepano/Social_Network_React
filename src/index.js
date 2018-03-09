import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './App';
import userDetails from './reducers';
import registerServiceWorker from './registerServiceWorker';
import './index.scss';

let store = createStore(userDetails);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
