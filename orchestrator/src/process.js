/**
 * process.js
 * @author Andrew Roberts
 */

import { Machine, interpret } from "xstate";

// visualized here
// https://xstate.js.org/viz/?gist=f9fd4c2bdd20d6e4d25e1ee2b6dd2cb3
const processMachine = Machine({
  id: "process",
  initial: "new",
  states: {
    new: {
      // "on" block defines
      on: {
        RECEIVED_BY_AGENT: "ready"
      }
    },
    ready: {
      on: {
        EXECUTED_BY_AGENT: "running"
      }
    },
    running: {
      on: {
        PROCESS_EXITED_CODE_0: "success",
        PROCESS_EXITED_CODE_1: "failure"
      }
    },
    success: {
      type: "final"
    },
    failure: {
      type: "final"
    }
  }
});

function Process(commandStringParam = "") {
  let commandString = commandStringParam;
  let eventHandlers = {};
  let pid = null;
  let exitCode = null;

  // xstate/interpret:
  // a function that takes a machine, instantiates it,
  // maintains the state of the machine,
  // and gives us the ability to send events to it.
  let service = interpret(processMachine).start();
  // The return value from an interpreted machine is called a "service,"
  // and after the service is started, we can send events to the machine using `service.send('EVENT_AS_STRING')`

  // exposed methods
  function getCommandString() {
    return commandString;
  }

  function getCurrentState() {
    return service.state.value;
  }

  function getExitCode() {
    return exitCode;
  }

  function getPid() {
    return pid;
  }

  function setPid(pidNumber) {
    if (pid == null) {
      pid = pidNumber;
      return true;
    }
    return false;
  }

  // exposed event handlers
  eventHandlers.onReceivedByAgent = function() {
    service.send("RECEIVED_BY_AGENT");
  };

  eventHandlers.onExecutedByAgent = function() {
    service.send("EXECUTED_BY_AGENT");
  };

  eventHandlers.onProcessExitedCode0 = function() {
    exitCode = 0;
    service.send("PROCESS_EXITED_CODE_0");
  };

  eventHandlers.onProcessExitedCode1 = function() {
    exitCode = 1;
    service.send("PROCESS_EXITED_CODE_1");
  };

  return {
    getCommandString,
    getCurrentState,
    getExitCode,
    getPid,
    setPid,
    eventHandlers
  };
}

export default Process;
