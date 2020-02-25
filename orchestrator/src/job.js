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
        SEND: "queued"
      }
    },
    queued: {
      on: {
        EXECUTE: "running",
        CANCEL: "stopped"
      }
    },
    running: {
      on: {
        ERROR: "stopped",
        INTERRUPT: "stopped",
        FINISH_SUCCESS: "stopped",
        FINISH_FAILURE: "stopped"
      }
    },
    stopped: {
      on: {
        SEND: "queued"
      }
    }
  }
});

function Job(
  id,
  name,
  command_language,
  command_options,
  stateMachine = jobMachine.initialState
) {
  // immer produce: returns deep frozen object
  return produce({}, draft => {
    draft.id = id;
    draft.name = name;
    draft.command_language = command_language;
    draft.command_options = command_options;
    draft.stateMachine = stateMachine;
  });
}

export default Job;
