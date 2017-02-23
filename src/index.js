import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import gomokuApp from './reducers';

// import Gomoku from './components/Gomoku';
import App from './containers/App';

let store = createStore(gomokuApp);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);