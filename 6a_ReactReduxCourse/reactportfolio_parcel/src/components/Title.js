import React, { Component} from 'react';

const TITLES = [
  'a software engineer',
  'a croche-er',
  'a three-spirited person',
  'a proud YIMBY.'
];

class Title extends Component {
    state = {titleIndex:0, fadeIn: true};

    componentDidMount() {
      this.timeout = setTimeout(() => this.setState({fadeIn: false}), 2000);
      this.animateTitles();
    }

    componentWillUnmount() {
      clearInterval(this.titleInterval);
      clearTimeout(this.timeout);
    }

    animateTitles = () => {
      this.titleInterval = setInterval(() => {
        const titleIndex = (this.state.titleIndex + 1) % TITLES.length;

        this.setState({ titleIndex:titleIndex, fadeIn:true }); //don't have to use key (only one val) - but more clear

        this.timeout = setTimeout(() => this.setState({fadeIn: false}), 2000);
      }, 4000);

      console.log("this.titleInterval", this.titleInterval);
    }

    render() {
      const { fadeIn, titleIndex } = this.state;

      const title = TITLES[titleIndex];
      return (
        <p className={fadeIn ? 'title-fade-in' : 'title-fade-out'}> I am {title} </p>
      )
    }
}

export default Title;
