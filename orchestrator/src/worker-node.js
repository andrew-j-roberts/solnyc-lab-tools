/**
 * worker-node.js
 * @author Andrew Roberts
 */

import produce from "immer";

function WorkerNode(ip, numCpus) {
  return produce({}, draft => {
    draft.ip = ip;
    draft.numCpus = numCpus;
  });
}

export default WorkerNode;
