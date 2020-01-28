/**
 * agent.js
 * @author Andrew Roberts
 */

import produce from "immer";

function Agent() {
  let processes = produce({}, draft => {});

  // getters
  function getProcesses() {
    return processes;
  }

  // methods
  function addProcess(process) {
    // prevent agent from attempting to add a duplicate process
    if (process.jobId in processes) {
      return false;
    }
    processes = produce(processes, draft => {
      draft[process.jobId] = process;
    });
    return true;
  }

  function interruptProcess(jobId) {
    // prevent agent from attempting to stop a job that doesn't exist
    if (!(jobId in processes)) {
      return false;
    }
    return processes[jobId]["processRef"].kill();
  }

  function removeProcess(jobId) {
    // prevent agent from attempting to remove a job that do not exist
    if (!(jobId in processes)) {
      return false;
    }
    // prevent agent from removing a job that has not exited
    processes = produce(processes, draft => {
      delete draft[jobId];
    });
    return true;
  }

  return produce({}, draft => {
    // getters
    draft.getProcesses = getProcesses;
    // methods
    draft.addProcess = addProcess;
    draft.interruptProcess = interruptProcess;
    draft.removeProcess = removeProcess;
  });
}

export default Agent;
