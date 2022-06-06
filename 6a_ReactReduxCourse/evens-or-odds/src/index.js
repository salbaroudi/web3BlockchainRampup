import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; //we call a fetch (async) in an action. Need Middleware for this.
import { Provider } from 'react-redux'; //higher order Component that wraps the application.
import './index.css';
import rootReducers from './reducers'; //reconstructed by combine reducers.

//Our global store, with THUNK arg.
const store = createStore(rootReducers, applyMiddleware(thunk));

console.log('store',store);
console.log('store.getState()', store.getState());

//No need for console.log statements when store changes.
store.subscribe(() => console.log("store.getState()",store.getState()));

//store is provided to the Provider wrapper.
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));
