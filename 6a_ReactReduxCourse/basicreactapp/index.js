console.log("hi");

//our CDN tags load the react modules, and they run in browser JS sandbox!
const element = React.createElement("div", null, "React Element!");

ReactDOM.render(element, document.getElementById("root"));
