import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux'; //higher order Component that wraps the application.
import './index.css';
import rootReducers from './reducers';


const store = createStore(rootReducers, applyMiddleware(thunk));

console.log('store',store);
console.log('store.getState()', store.getState());

store.subscribe(() => console.log("store.getState()",store.getState()));
/*
store.dispatch(startGame());
store.dispatch(expandInstructions());
store.dispatch(cancelGame());
store.dispatch(collapseInstructions());
*/

ReactDOM.render( //store is provided to the Provider wrapper. However the App doesn't have access just yet.
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));
