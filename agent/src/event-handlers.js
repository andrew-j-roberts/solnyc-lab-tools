/**
 * event-handlers.js
 * @author Andrew Roberts
 */

import shelljs from "shelljs";
import Process from "./process";

function handleExecuteJobEvent(event, agent) {
  // prevent agent from executing duplicate jobs
  if (agent.getProcesses()[event.jobId]) {
    return false;
  }
  let processRef = shelljs.exec(event.commandString, { async: true });
  // do something with events
  // processRef.stdout.on('data', (data) => {
  //   console.log(`stdout: ${data}`);
  // });
  // processRef.stderr.on('data', (data) => {
  //   console.error(`stderr: ${data}`);
  // });
  // child.on("exit", function (code, signal) {
  //   if (code === null && signal === "SIGTERM") {
  //     console.log("child has been terminated");
  //   }
  // });
  let process = Process(event.jobId, processRef);
  return agent.addProcess(process);
}

function handleInterruptJobEvent(event, agent) {
  // prevent agent from trying to stop a job that doesn't exist
  if (!agent.getProcesses()[event.jobId]) {
    return false;
  }
  return agent.interruptJob(event.jobId);
}

export { handleExecuteJobEvent, handleInterruptJobEvent };
