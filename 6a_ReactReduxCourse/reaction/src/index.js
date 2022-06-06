import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import App from './components/App';
import './index.css';
import PubSub, { PubSubContext } from "./pubsub"; //will include it at the top and run!
import { newMessage } from "./actions/messages.js";

//This is our global store. Extra argument hooked up so ReduxTools in Chromium can display state in RT.
const store = createStore(rootReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

//Everytime our state changes, we will get a message in console.log. Helps with debugging.
store.subscribe(() => console.log("store.getState()", store.getState()));

const pubsub = new PubSub();

pubsub.addListener({
  message: messageObject => {
    const {message, channel } = messageObject;

    console.log('Received Message:', message, "channel:", channel);

    store.dispatch(message);
  }
});

//Just send a message
setTimeout(() => {
  pubsub.publish(newMessage({text: "Goodbye World!", username: "Bill"}));
},1000);

ReactDOM.render(
  <Provider store={store}>
    <PubSubContext.Provider value={{pubsub}}>
      <App />
    </PubSubContext.Provider>
  </Provider>, document.getElementById('root')
);
