/**
 * orchestrator.js
 * @author Andrew Roberts
 */

import produce from "immer";
import WorkerNode from "../src/worker-node";

function Orchestrator() {
  let workerNodes = produce(new Map(), draft => {}); // produces empty immutable Map
  let cpuUsage = produce(new Map(), draft => {});
  let jobsList = produce(new Map(), draft => {});
  let jobGroups = produce(new Map(), draft => {});

  const Job = {
    id: 0,
    commandString: "sdkperf_command"
  };

  function start() {}

  function interpret(configObj) {
    // Developer note:
    // I could've taken a file path as an argument
    // and loaded/parsed the config in this method,
    // but that's harder to test and feels opinionated.
    // I decided to keep this data structure clean by expecting
    // the config to be passed to it in JSON format.
    try {
      configObj.workerNodes.forEach(function(workerNodeConfigObj) {
        let workerNode = WorkerNode(
          workerNodeConfigObj.ip,
          workerNodeConfigObj.numCpus
        );
        addWorkerNode(workerNode);
      });
    } catch (e) {
      console.error(e);
      console.log("Config file can't be interpreted, check it for errors!");
      process.exit(1);
    }
  }

  function assignJobToCpu(workerNodeIp, cpuNum, jobId) {
    cpuUsageMap = produce(cpuUsageMap, draft => {
      let test = draft.get(workerNodeIp);
      console.log(test);
    });
    return true;
  }

  function getWorkerNodes() {
    return workerNodes;
  }

  function addWorkerNode(workerNode) {
    try {
      workerNodes = produce(workerNodes, draft => {
        draft.set(workerNode.getIp(), workerNode);
      });
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  function removeWorkerNode(workerNodeIp) {
    let res;
    workerNodes = produce(workerNodes, draft => {
      res = draft.delete(workerNodeIp);
    });
    return res;
  }

  return {
    start,
    interpret,
    getWorkerNodes,
    addWorkerNode,
    removeWorkerNode
  };
}

export default Orchestrator;
