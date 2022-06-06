import { NEW_MESSAGE } from "./types";
import uuid from "uuid/v4";

//action function.
//Called by PublishMessage-> publishMessage() function,
//which has access to username and text, and feeds it forward.
export const newMessage = ({ text, username }) => ({
  type: NEW_MESSAGE,
  item: { id: uuid(), timestamp: Date.now(), text, username }
});
