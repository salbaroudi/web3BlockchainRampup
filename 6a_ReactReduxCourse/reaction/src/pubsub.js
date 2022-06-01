import PubNub from "pubnub";
import pubnubConfig from "./pubnub.config";

const pubnub = new PubNub(pubnubConfig);

export const MESSAGE_CHANNEL = "MESSAGE_CHANNEL";

//Async functions.
pubnub.subscribe({channels: [MESSAGE_CHANNEL]});
//An event callback that fires everytime there is a change to the channel.
//We also get a message when new users subscribe to the channel!
pubnub.addListener({
  message: messageObject => {
    console.log("messageObject", messageObject);
  }
});

//This needs to run last...
setTimeout(() => {
  pubnub.publish({
    message: "foo",
    channel: MESSAGE_CHANNEL
  });
},1000);
