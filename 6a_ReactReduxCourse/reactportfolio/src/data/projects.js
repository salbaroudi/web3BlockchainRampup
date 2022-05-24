import p1 from '../assets/project1.png';
import p2 from '../assets/project2.png'; //notice that we can do relative paths...
import p3 from '../assets/project3.png'; //and bind an image to a name!!


//Use uppercase names for GLOBAL variables.
const PROJECTS = [
  {
    id:1, //you distinguish similar items with id's (databases)
    title: 'Example React Application',
    description: 'A react app I built, involving JS and core web dev concepts!',
    link: 'https://github.com/15Dkatz/example',
    image: p1
  },
  {
    id:2,
    title:"My API",
    description:"A REST API that I built from Scratch.",
    link:'https://github.com/15Dkatz/example',
    image: p2
  },
  {
    id:3,
    title: "Operating Systems Final Project",
    description:"My final project for my Operating Systems Course",
    link:'https://github.com/15Dkatz/example',
    image: p3
  }
];

export default PROJECTS; //Shares with the rest of code base.
