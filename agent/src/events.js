/**
 * index.js
 * @author Andrew Roberts
 */

import produce from "immer";

function ExecuteJobEvent(jobId, commandString) {
  return produce({}, draft => {
    draft.jobId = jobId;
    draft.commandString = commandString;
  });
}

function InterruptJobEvent(jobId) {
  return produce({}, draft => {
    draft.jobId = jobId;
  });
}

export { ExecuteJobEvent, InterruptJobEvent };
