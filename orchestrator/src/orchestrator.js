/**
 * orchestrator.js
 * datastructure used to organize and store client state
 * @author Andrew Roberts
 */

import produce from "immer";
import Worker from "../src/worker";

function Orchestrator(orchestratorConfig) {
  let jobs = produce({}, draft => {});
  let jobAssignments = produce({}, draft => {}); // jobId: {workerNodeIp: string, cpuNumbers: [num, ...]}
  let workers = produce({}, draft => {}); // produces empty immutable object

  function start() {
    orchestratorConfig.workerNodes.forEach(workerConfig => {
      let worker = Worker(workerConfig.ip, workerConfig.numCpus);
      let addResult = addWorker(worker);
      // prevent user from starting orchestrator if there are duplicate worker nodes or if the config is malformed
      if (!addResult) {
        console.log(
          "Duplicates detected in config file, please check worker node IPs."
        );
        process.exit(1);
      }
    });
  }

  function getJobs() {
    return jobs;
  }

  function getJobAssignments() {
    return jobAssignments;
  }

  function getWorkers() {
    return workers;
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

  function addWorker(worker) {
    // prevent orchestrator from adding duplicates
    if (worker.ip in workerNodes) {
      return false;
    }
    workerNodes = produce(workerNodes, draft => {
      draft[worker.ip] = worker;
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
    draft.getWorkers = getWorkers;
    draft.getJobs = getJobs;
    // draft.getJobGroups = getJobGroups;
    draft.getJobAssignments = getJobAssignments;
    // methods
    draft.start = start;
    draft.addJob = addJob;
    draft.removeJob = removeJob;
    draft.assignJob = assignJob;
    draft.addWorker = addWorker;
    draft.removeWorkerNode = removeWorkerNode;
  });
}

export default Orchestrator;
