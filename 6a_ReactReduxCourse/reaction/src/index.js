import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import App from './components/App';
import './index.css';
import "./pubsub"; //will include it at the top and run!


const store = createStore(rootReducer);

console.log("store.getState()", store.getState());

store.subscribe(() => console.log("store.getState()", store.getState()));

ReactDOM.render(
  <Provider store={store}>
  <App />
  </Provider>, document.getElementById('root')
);
