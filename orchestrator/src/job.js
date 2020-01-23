/**
 * job.js
 * @author Andrew Roberts
 */

import { Machine } from "xstate";
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
        JOB_STARTED: "running"
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

function Job(id, name, command) {
  // immer produce: returns deep frozen object
  return produce({}, draft => {
    draft.id = id;
    draft.name = name;
    draft.command = command;
    draft.jobMachine = jobMachine; // jobMachine set to initial state
  });
}

export default Job;
