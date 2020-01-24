/**
 * execute-job.js
 * @author Andrew Roberts
 */

import produce from "immer";

function ExecuteJobEvent(jobId, command) {
  return produce({}, draft => {
    draft.jobId = jobId;
    draft.command = command;
  });
}

export default ExecuteJobEvent;
