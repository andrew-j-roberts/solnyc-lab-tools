/**
 * mqtt-clients.js
 * @author Andrew Roberts
 */

import mqtt from "mqtt";
import produce from "immer";

function MqttSubscriber({ hostUrl, username, password }) {
  let client = null;
  let eventHandlers = produce({}, draft => {});

  // connects client to message broker and ensures connack is received
  async function connect() {
    return new Promise((resolve, reject) => {
      client = mqtt.connect(hostUrl, { username: username, password: password });
      client.on("message", (topic, message) => {
        if (eventHandlers[topic]) {
          console.log(`Received message on topic ${topic}: ${message.toString()}`);
          eventHandlers[topic](message);
        } else {
          console.error(`Received messages on topic ${topic}, but no corresponding handler is set.`);
        }
      });
      client.on("connect", () => {
        resolve(client);
      });
    });
  }

  // adds handler, subscribes to provided topic, and ensures suback is received
  async function addEventHandler(topic, handler, qos = 0) {
    return new Promise((resolve, reject) => {
      // guard: prevent attempting to interact with client that does not exist
      if (!client) {
        reject("Client has not connected yet");
      }
      // guard: prevent client from attempting to add duplicate event handlers
      if (topic in eventHandlers) {
        reject("Event already has a handler");
      }
      // add event handler
      eventHandlers = produce(eventHandlers, draft => {
        draft[topic] = handler;
      });
      // subscribe to topic on client
      client.subscribe(topic, { qos }, function(err, granted) {
        // guard: err != null indicates a subscription error or an error that occurs when client is disconnecting
        if (err) reject(err);
        // else, subscription is verified
        console.log(`Suback received for topic "${granted[0].topic}" using QOS ${granted[0].qos}`);
        resolve();
      });
    });
  }

  // removes handler, unsubscribes from provided topic, and ensures unsuback is received
  function removeEventHandler(topic) {
    return new Promise((resolve, reject) => {
      // guard: prevent attempting to interact with client that does not exist
      if (!client) {
        reject("Client has not connected yet");
      }
      // guard: prevent client from attempting to remove an event handler that doesn't exist
      if (!(topic in eventHandlers)) {
        reject("Cannot remove topic that does not have an associated handler");
      }
      // remove event handler
      eventHandlers = produce(eventHandlers, draft => {
        delete draft[topic];
      });
      // unsubscribe from topic on client
      client.unsubscribe(topic, null, function(err) {
        // guard: err != null indicates an error occurs if client is disconnecting
        if (err) reject(err);
        // else, unsubscription verified
        console.log(unsuback);
        resolve();
      });
    });
  }

  return produce({}, draft => {
    draft.connect = connect;
    draft.addEventHandler = addEventHandler;
    draft.removeEventHandler = removeEventHandler;
  });
}

function MqttPublisher({ hostUrl, username, password }) {
  return new Promise((resolve, reject) => {
    let client = mqtt.connect(hostUrl, { username: username, password: password });

    client.on("message", (topic, message) => {
      console.log(`Received message on topic ${topic}: ${message.toString()}`);
    });

    client.on("connect", () => {
      client.subscribe("foo", function(err) {});
      resolve(client);
    });
  });
}

export { MqttSubscriber, MqttPublisher };
