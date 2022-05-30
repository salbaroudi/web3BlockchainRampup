import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Instructions from "./components/Instructions";
import { createStore } from 'redux';
import { Provider } from 'react-redux'; //higher order Component that wraps the application.
import './index.css';
import rootReducer from './reducers';


const store = createStore(rootReducer);

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
    <Instructions />
  </Provider>, document.getElementById('root'));
