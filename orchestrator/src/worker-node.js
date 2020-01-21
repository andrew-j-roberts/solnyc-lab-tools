/**
 * worker-node.js
 * @author Andrew Roberts
 */

function WorkerNode(ipString, numCpusParam) {
  let ip = ipString;
  let numCpus = numCpusParam;

  function getIp() {
    return ip;
  }

  function getNumCpus() {
    return numCpus;
  }

  return {
    assignJobToCpu,
    getIp,
    getNumCpus
  };
}

export default WorkerNode;
