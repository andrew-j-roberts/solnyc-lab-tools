/**
 * mqtt-clients.js
 * @author Andrew Roberts
 */

import mqtt from "mqtt";

function MqttSubscriber({ hostUrl, username, password }) {
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

function MqttPublisher() {}

export { MqttSubscriber, MqttPublisher };
