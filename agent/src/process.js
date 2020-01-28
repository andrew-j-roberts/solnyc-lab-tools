/**
 * process.js
 * @author Andrew Roberts
 */

import produce from "immer";

function Process(jobId, processRef) {
  return {
    jobId,
    processRef
  };
}

export default Process;
