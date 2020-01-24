/**
 * orchestrator.js
 * @author Andrew Roberts
 */

import produce from "immer";
import WorkerNode from "../src/worker-node";

function Orchestrator(orchestratorConfig) {
  let workerNodes = produce({}, draft => {}); // produces empty immutable object
  let jobs = produce({}, draft => {});
  // let jobGroups = produce({}, draft => {});
  let jobAssignments = produce({}, draft => {}); // jobId: {workerNodeIp: string, cpuNumbers: [num, ...]}

  // getters

  function getWorkerNodes() {
    return workerNodes;
  }

  function getJobs() {
    return jobs;
  }

  // function getJobGroups() {
  //   return jobGroups;
  // }

  function getJobAssignments() {
    return jobAssignments;
  }

  // methods

  function start() {
    orchestratorConfig.workerNodes.forEach(workerNodeConfig => {
      let workerNode = WorkerNode(workerNodeConfig.ip, workerNodeConfig.numCpus);
      let addResult = addWorkerNode(workerNode);
      // prevent user from starting orchestrator if there are duplicate worker nodes or if the config is malformed
      if (!addResult) {
        console.log("Duplicates detected in config file, please check worker node IPs.");
        process.exit(1);
      }
    });
  }

  function addJob(job) {
    // prevent orchestrator from adding duplicates
    if (job.id in jobs) {
      return false;
    }
    jobs = produce(jobs, draft => {
      draft[job.id] = job;
    });
    return true;
  }

  function removeJob(job) {
    // prevent orchestrator from attempting to remove worker nodes that do not exist
    if (!(workerNodeIp in workerNodes)) {
      return false;
    }
    workerNodes = produce(workerNodes, draft => {
      delete draft.workerNodeIp;
    });
    return true;
  }

  function assignJob(jobId, workerNodeIp, cpuNumbers) {
    jobAssignments = produce(jobAssignments, draft => {
      draft[jobId] = {
        workerNodeIp,
        cpuNumbers
      };
    });
    return jobId;
  }

  function addWorkerNode(workerNode) {
    // prevent orchestrator from adding duplicates
    if (workerNode.ip in workerNodes) {
      return false;
    }
    workerNodes = produce(workerNodes, draft => {
      draft[workerNode.ip] = workerNode;
    });
    return true;
  }

  function removeWorkerNode(workerNodeIp) {
    // prevent orchestrator from attempting to remove worker nodes that do not exist
    if (!(workerNodeIp in workerNodes)) {
      return false;
    }
    workerNodes = produce(workerNodes, draft => {
      delete draft.workerNodeIp;
    });
    return true;
  }

  return produce({}, draft => {
    // getters
    draft.getWorkerNodes = getWorkerNodes;
    draft.getJobs = getJobs;
    // draft.getJobGroups = getJobGroups;
    draft.getJobAssignments = getJobAssignments;
    // methods
    draft.start = start;
    draft.addJob = addJob;
    draft.removeJob = removeJob;
    draft.assignJob = assignJob;
    draft.addWorkerNode = addWorkerNode;
    draft.removeWorkerNode = removeWorkerNode;
  });
}

export default Orchestrator;
