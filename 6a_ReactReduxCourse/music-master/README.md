## Introduction:

This project is a modification of the music-master project for the [ReactJS and Redux Bootcamp course]().

The project was **dependent** on the course instructor providing a Spotify API wrapper running in the cloud.
However the server has been down for a number of months, and the instructor does not appear to maintain the
service regularly.

To avoid dealing with Spotify API key issues, I selected another open data music API that I found on
the [public-apis](https://github.com/public-apis/public-apis#music), called **Openwhyd**. To avoid CORS Policy issues,
a proxy service was used [cors-anywhere](https://cors-anywhere.herokuapp.com/).


Essentially, requests were passed through the cors-anywhere demo websitre, to fetch user data from Openwhyd for this
application. The idea for this came from the following [StackOverflow Post](https://stackoverflow.com/questions/43262121/trying-to-use-fetch-and-pass-in-mode-no-cors)

## Running the Project:

1) npm install

2) Go to [cors-anywhere](https://cors-anywhere.herokuapp.com/) in a browser, and click the button to set up a session. You can
use the *https://cors-anywhere.herokuapp.com/*. The temporary permission should carry over to React and the fetch() method.

3) npm run dev and open app in browser.

4) Go to Openwhyd home page, and select a user name from the "Recent Posts" found on the page. Use these user names to
search in the App. The 5 recent user posts, and the first Playlist results will be displayed, below.
