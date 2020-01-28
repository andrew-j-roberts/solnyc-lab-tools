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
import { MqttSubscriber } from "./mqtt-clients";
import {
  handleExecuteJobEvent,
  handleInterruptJobEvent
} from "./event-handlers";

async function run() {
  let agent = Agent();

  // initialize topic prefix and worker node id to env variables
  let topicPrefix = process.env.SOLACE_TOPIC_PREFIX;
  let workerNodeId = process.env.WORKER_NODE_ID;

  // initialize mqtt client config properties to env variables
  let mqttClientConfig = {
    hostUrl: process.env.SOLACE_MQTT_HOST_URL,
    username: process.env.SOLACE_USERNAME,
    password: process.env.SOLACE_PASSWORD
  };

  // initialize and connect publisher
  let publisher;
  try {
    executeJobListener = MqttSubscriber(mqttClientConfig);
    await executeJobListener.connect();
  } catch (err) {
    console.err(err);
  }

  // initialize and connect execute job listener
  let executeJobListener;
  try {
    executeJobListener = MqttSubscriber(mqttClientConfig);
    await executeJobListener.connect();
  } catch (err) {
    console.err(err);
  }

  // initialize and connect interrupt job listener
  let interruptJobListener;
  try {
    interruptJobListener = MqttSubscriber(mqttClientConfig);
    await interruptJobListener.connect();
  } catch (err) {
    console.err(err);
  }

  // use partial application to include agent and publisher in event handlers' scopes
  let executeJobEventHandler = handleExecuteJobEvent(agent, publisher);
  let interruptJobEventHandler = handleInterruptJobEvent(agent, publisher);

  // add event handlers to listeners
  try {
    await executeJobListener.addEventHandler(
      `${topicPrefix}/Execute/${workerNodeId}`,
      event => executeJobEventHandler(event),
      1 // qos
    );
    await interruptJobListener.addEventHandler(
      `${topicPrefix}/Interrupt/${workerNodeId}`,
      event => interruptJobEventHandler(event),
      1 // qos
    );
  } catch (err) {
    console.err(err);
  }

  // run until a kill signal is received
  console.log(
    "Agent successfully started. Running until a SIGINT signal is received..."
  );
  process.stdin.resume();
  process.on("SIGINT", function() {
    process.exit();
  });
}

run();
