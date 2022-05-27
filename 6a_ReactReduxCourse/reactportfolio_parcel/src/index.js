//This is our default JS file, that links things together.

import React from 'react'; //core library
import ReactDOM from "react-dom"; //allow us to insert our app into the DOM tree
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
//import { Router, Switch, Route } from 'react-router-dom';
import App from './components/App';
import Jokes from './components/Jokes';
import { createBrowserHistory } from 'history';
import './index.css' //if you import into index.js, you can have custom style sheets for each component! vs one big file.

const history = createBrowserHistory();
/*
ReactDOM.render(
    <Router>
        <Switch>
          <Route exact path="/">
            <App />
          </Route>
          <Route path="/jokes">
            <Jokes />
          </Route>
        </Switch>
    </Router>,
     document.getElementById("root"));
*/
//We just use JSX tags with the App's name, to render it in the DOM tree.
ReactDOM.render(
  <Router history={history}>
    <Switch>
      <Route path='/' component={App} />
      <Route path='/jokes' component={Jokes} />
    </Switch>
  </Router>,
   document.getElementById("root"));
//We use a self-enclosing tag, as our App has no child dependencies.

/*
new Promise((resolve, reject) => {
  return reject(new Error("No Bananas"));
  setTimeout(() => {
    console.log("Bears");
    resolve() //this is actually like a return - not a ciruclar call!
  }, 500);
})
.then(() => {
  console.log('Beets');
  console.log("BSG");
})
.catch(error => console.log("ERROR::",error));

new Promise( resolve => {
  setTimeout(() => {
    resolve("Bears, Beats BSG"); //this is actually like a return - not a ciruclar call!
  }, 2000);
})
.then((quote) => {
  console.log(quote);
});
*/
