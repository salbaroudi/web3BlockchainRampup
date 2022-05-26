import emailIcon from '../assets/twitter_icon.png';
import linkIcon from '../assets/linkedin_icon.png';
import twitIcon from '../assets/twitter_icon.png';
import gitIcon from '../assets/github_icon.png';

//This is a data file.
//Use uppercase names for GLOBAL variables.
const SOCIAL_PROFILES = [
  {
    id:1, //you distinguish similar items with id's (databases)
    link: 'mailto:myemail@gmail.com',
    image: emailIcon
  },
  {
    id:2,
    link:'https://linkedin.com',
    image: linkIcon
  },
  {
    id:3,
    link:'https://twitter.com',
    image: twitIcon
  },
  {
    id:4,
    link:'https://github.com',
    image: gitIcon
  }
];

export default SOCIAL_PROFILES;
