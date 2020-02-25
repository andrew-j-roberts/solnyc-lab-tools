/**
 * worker.js
 * @author Andrew Roberts
 */

import produce from "immer";

function Worker(ip, numCpus) {
  return produce({}, draft => {
    draft.ip = ip;
    draft.numCpus = numCpus;
  });
}

export default Worker;
