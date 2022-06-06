import {SET_USER_NAME} from "./types";

/* Action generator.
It is called by _______ and username is passed.
We return a simple action object.
*/

export const setUsername = username => ({ type: SET_USER_NAME, username });
