/**
 * job.js
 * @author Andrew Roberts
 */

import { Machine, interpret } from "xstate";
import produce from "immer";

const jobMachine = Machine({
  id: "job",
  initial: "new",
  context: {
    retries: 0
  },
  states: {
    new: {
      on: {
        RUN: "running"
      }
    },
    running: {
      on: {
        ERROR: "idle",
        INTERRUPT: "idle",
        JOB_FINISHED_SUCCESS: "idle",
        JOB_FINISHED_FAILURE: "idle"
      }
    },
    idle: {
      on: {
        RUN: "running"
      }
    }
  }
});

function Job(idNum, jobNameString, commandObj) {
  let id = idNum;
  let name = jobNameString;
  let command = commandObj;

  // xstate/interpret:
  // a function that takes a machine, instantiates it,
  // maintains the state of the machine,
  // and gives us the ability to send events to it.
  let service = interpret(jobMachine).start();
  // The return value from interpret is called a "service,"
  // and after the service is started, we can send events to the machine using `service.send('EVENT_AS_STRING')`

  function isRunning() {
    if (service.state.value === "running") {
      return true;
    }

    return false; // new or idle
  }

  function getId() {
    return id;
  }

  function setId(idNum) {
    id = idNum;
  }

  function getName() {
    return name;
  }

  function setName(nameString) {
    name = nameString;
  }

  function getCommand() {
    return command;
  }

  function setCommand(commandObj) {
    command = commandObj;
  }

  return {
    isRunning,
    getId,
    setId,
    getName,
    setName,
    getCommand,
    setCommand
  };
}

export default Job;
