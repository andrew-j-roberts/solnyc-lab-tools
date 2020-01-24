/**
 * interrupt-job.js
 * @author Andrew Roberts
 */

import produce from "immer";

function InterruptJobEvent(jobId) {
  return produce({}, draft => {
    draft.jobId = jobId;
  });
}

export default InterruptJobEvent;
