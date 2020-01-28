/**
 * process.js
 * @author Andrew Roberts
 */

import produce from "immer";

function Process({ jobId, processRef }) {
  return produce({}, draft => {
    draft.jobId = jobId;
    draft.processRef = processRef;
  });
}

export default Process;
