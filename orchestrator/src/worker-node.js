/**
 * worker-node.js
 * @author Andrew Roberts
 */

function WorkerNode(ip, numCpus) {
  return Object.freeze({
    ip,
    numCpus
  });
}

export default WorkerNode;
