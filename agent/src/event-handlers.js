/**
 * event-handlers.js
 * @author Andrew Roberts
 */

import shelljs from "shelljs";
import Process from "./process";
import {
  JobCmdExecuteEvent,
  JobCmdInterruptEvent,
  JobLogEvent,
  JobSysEvent
} from "./events";

const handleExecuteJobEvent = (agent, mqttClient) => async event => {
  // parse event
  let eventObj = JSON.parse(event.toString());

  // guard: prevent agent from executing duplicate jobs
  if (agent.getProcesses()[eventObj.jobId]) {
    return false;
  }
  // guard: attempt to parse event, fail if message is malformed
  let executeJobEvent;
  try {
    executeJobEvent = JobCmdExecuteEvent(eventObj);
  } catch (err) {
    console.error(
      "Message received by handleExecuteJobEvent was malformed, unable to process."
    );
    return false;
  }

  // start process
  let processRef = shelljs.exec(executeJobEvent.commandString, { async: true });

  // pipe process outputs to Solace broker
  processRef.stdout.on("data", async data => {
    // stdout gets piped to Solace as an info level log event
    let payload = JobLogEvent({
      jobId: executeJobEvent.jobId,
      level: "INFO",
      data: data,
      timestamp: Date.now()
    });
    payload = JSON.stringify(payload);
    try {
      let res = await mqttClient.send(
        `Job/${executeJobEvent.jobId}/LOG/INFO`,
        payload,
        1 // qos
      );
    } catch (err) {
      console.error(err);
      return false;
    }
  });

  processRef.stderr.on("data", async data => {
    // stderr gets piped to Solace as an error level log event
    let payload = JobLogEvent({
      jobId: executeJobEvent.jobId,
      level: "ERROR",
      data: data,
      timestamp: Date.now()
    });
    payload = JSON.stringify(payload);
    try {
      let res = await mqttClient.send(
        `Job/${executeJobEvent.jobId}/LOG/ERROR`,
        payload,
        1 // qos
      );
    } catch (err) {
      console.error(err);
      return false;
    }
  });

  processRef.on("exit", async function(code, signal) {
    // exit gets piped to Solace as a sys event
    let data = { code, signal };
    let payload = JobSysEvent({
      jobId: executeJobEvent.jobId,
      type: "EXITED",
      data: data,
      timestamp: Date.now()
    });
    payload = JSON.stringify(payload);
    try {
      let res = await mqttClient.send(
        `Job/${executeJobEvent.jobId}/SYS/EXITED`,
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

  // add process to agent so that it can keep track of active processes
  agent.addProcess(process);

  // publish a SYS event to indicate the process is running
  let data = null;
  let payload = JobSysEvent({
    jobId: executeJobEvent.jobId,
    type: "STARTED",
    data: data,
    timestamp: Date.now()
  });
  payload = JSON.stringify(payload);
  try {
    let res = await mqttClient.send(
      `Job/${executeJobEvent.jobId}/SYS/STARTED`,
      payload,
      1 // qos
    );
  } catch (err) {
    console.error(err);
    return false;
  }

  return true;
};

const handleInterruptJobEvent = agent => async event => {
  // parse event
  let eventObj = JSON.parse(event.toString());

  // guard: prevent agent from executing duplicate jobs
  if (agent.getProcesses()[eventObj.jobId]) {
    return false;
  }
  // guard: validate event structure, fail if event is malformed
  let interruptJobEvent;
  try {
    interruptJobEvent = JobCmdInterruptEvent(eventObj);
  } catch (err) {
    console.error(
      "Message received by handleInterruptJobEvent was malformed, unable to process."
    );
    return false;
  }

  // kill process, which will trigger a SYS/EXITED event
  agent.interruptProcess(interruptJobEvent.jobId);

  // remove process from agent
  agent.removeProcess(interruptJobEvent.jobId);

  return true;
};

export { handleExecuteJobEvent, handleInterruptJobEvent };
