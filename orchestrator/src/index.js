/**
 * index.js
 * lifecycle stuff, integration code between PostgreSQL & orchestrator, and event handling
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

import { PrismaClient } from "@prisma/client";
import MqttClient from "./mqtt-client";
import { handleAddJobEvent } from "./event-handlers";
import Orchestrator from "./orchestrator";
import { orchestratorConfig } from "./orchestrator-config";

async function run() {
  // initialize and connect prisma client
  const prismaClient = new PrismaClient();
  await prismaClient.connect();

  // initialize and connect mqtt client
  let mqttClientConfig = {
    hostUrl: process.env.SOLACE_MQTT_HOST_URL,
    username: process.env.SOLACE_USERNAME,
    password: process.env.SOLACE_PASSWORD
  };
  let mqttClient;
  try {
    mqttClient = MqttClient(mqttClientConfig);
    await mqttClient.connect();
  } catch (err) {
    console.error(err);
  }

  // initialize orchestrator with config object and prisma client so that it can communicate w/ PostgreSQL db
  let orchestrator = Orchestrator(orchestratorConfig);

  // use partial application to include orchestrator and prisma client in event handlers' scopes
  let addJobEventHandler = handleAddJobEvent(prismaClient, orchestrator);

  // add event handlers to mqtt client
  try {
    await mqttClient.addEventHandler(
      `Job/*/CMD/Add`,
      event => addJobEventHandler(event),
      1 // qos
    );
  } catch (err) {
    console.error(err);
  }

  // run until a kill signal is received
  console.log(
    "Orchestrator successfully started. Running until a SIGINT signal is received..."
  );
  process.stdin.resume();
  process.on("SIGINT", function() {
    process.exit();
  });
}

run();
