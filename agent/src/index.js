/**
 * index.js
 * @author Andrew Roberts
 */

// polyfill async
import "core-js";
import "regenerator-runtime";
// load env variables
import dotenv from "dotenv";
let result = dotenv.config();
if (result.error) {
  throw result.error;
}

import Agent from "./agent";
import Process from "./process";
import { MqttSubscriber } from "./mqtt-clients";

async function run() {
  let agent = Agent();

  // connect mqtt subscriber
  let mqttClientConfig = {
    hostUrl: process.env.SOLACE_MQTT_HOST_URL,
    username: process.env.SOLACE_USERNAME,
    password: process.env.SOLACE_PASSWORD
  };
  let mqttClient;
  try {
    mqttClient = await MqttSubscriber(mqttClientConfig);
  } catch (err) {
    console.err(err);
  }

  // run until a kill signal is received
  console.log("Agent successfully started. Running until a SIGINT signal is received...");
  process.stdin.resume();
  process.on("SIGINT", function() {
    process.exit();
  });
}

run();
