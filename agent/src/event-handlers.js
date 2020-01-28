/**
 * event-handlers.js
 * @author Andrew Roberts
 */

import shelljs from "shelljs";
import Process from "./process";
import {
  ExecuteJobEvent,
  InterruptJobEvent,
  JobInfoEvent,
  JobErrorEvent,
  JobExitEvent,
  JobStartEvent
} from "./events";

// TODO: potentially wrap this in a promise
const handleExecuteJobEvent = (agent, mqttClient) => event => {
  // guard: prevent agent from executing duplicate jobs
  if (agent.getProcesses()[event.jobId]) {
    return false;
  }
  // guard: attempt to parse event, fail if message is malformed
  let executeJobEvent;
  try {
    executeJobEvent = ExecuteJobEvent(JSON.parse(event.toString()));
  } catch (err) {
    return false;
  }

  // initialize topic prefix to env variable
  let topicPrefix = process.env.SOLACE_TOPIC_PREFIX;

  // start process
  let processRef = shelljs.exec(executeJobEvent.commandString, { async: true });

  // configure the process's pipes
  processRef.stdout.on("data", async data => {
    // form payload for message
    let payload = JobInfoEvent({ jobId: executeJobEvent.jobId, data });
    payload = JSON.stringify(payload);
    // stdout: publish on Info/Job/<JobID>
    try {
      let res = await mqttClient.send(
        `${topicPrefix}/Info/Job/${executeJobEvent.jobId}`,
        payload,
        1 // qos
      );
    } catch (err) {
      console.error(err);
      return false;
    }
  });

  processRef.stderr.on("data", async data => {
    // form payload for message
    let payload = JobErrorEvent({ jobId: executeJobEvent.jobId, data });
    payload = JSON.stringify(payload);
    // stderr: publish on Error/Job/<JobID>
    try {
      let res = await mqttClient.send(
        `${topicPrefix}/Error/Job/${executeJobEvent.jobId}`,
        payload,
        1 // qos
      );
    } catch (err) {
      console.error(err);
      return false;
    }
  });

  processRef.on("exit", async function(code, signal) {
    // form payload for message
    let payload = JobExitEvent({ jobId: executeJobEvent.jobId, code, signal });
    payload = JSON.stringify(payload);
    // exit: publish on Exit/Job/<JobID>
    try {
      let res = await mqttClient.send(
        `${topicPrefix}/Exit/Job/${executeJobEvent.jobId}`,
        payload,
        1 // qos
      );
    } catch (err) {
      console.error(err);
      return false;
    }
  });

  // create process object to map job id to its process ref
  let process = Process({ jobId: executeJobEvent.jobId, processRef });

  // add process to agent to keep track of active processes
  agent.addProcess(process);

  // send update job event
  let payload = JobStartEvent({ jobId: executeJobEvent.jobId });
  payload = JSON.stringify(payload);
  try {
    let res = await mqttClient.send(
      `${topicPrefix}/Running/Job/${executeJobEvent.jobId}`,
      payload,
      1 // qos
    );
  } catch (err) {
    console.error(err);
    return false;
  }
  
  mqttClient.send("", JSON.stringify({ abc: 123, def: "test" }), 1);

  return true;
};

const handleInterruptJobEvent = (agent, publisher) => event => {
  // guard: prevent agent from trying to stop a job that doesn't exist
  if (!agent.getProcesses()[event.jobId]) {
    return false;
  }
  return agent.interruptJob(event.jobId);
};

export { handleExecuteJobEvent, handleInterruptJobEvent };
