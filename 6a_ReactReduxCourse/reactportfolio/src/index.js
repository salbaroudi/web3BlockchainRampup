//This is our default JS file, that links things together.

import React from 'react'; //core library
import ReactDOM from "react-dom"; //allow us to insert our app into the DOM tree
import App from './App';
import './index.css' //if you import into index.js, you can have custom style sheets for each component! vs one big file.



//We just use JSX tags with the App's name, to render it in the DOM tree.
ReactDOM.render(<App />, document.getElementById("root"));
//We use a self-enclosing tag, as our App has no child dependencies.
