/**
 * orchestrator.test.js
 * @author Andrew Roberts
 */

import produce from "immer";
import Orchestrator from "../src/orchestrator";
import WorkerNode from "../src/worker-node";
import Job from "../src/job";

// Tests follow this pattern:
// describe('[unit of work]', () => {
//   describe('when [scenario/context]', () => {
//     it('should [expected behaviour]', () => {});
//   });
// });
// https://github.com/mawrkus/js-unit-testing-guide#name-your-tests-properly

describe("An Orchestrator instance", () => {
  describe("when initialized", () => {
    // getters
    it("should properly return its worker nodes list", () => {
      let dummyOrchestrator = Orchestrator();
      let dummyWorkerNode = WorkerNode("192.168.0.20", 6);
      let setResult = dummyOrchestrator.addWorkerNode(dummyWorkerNode);
      const desiredWorkerNodeList = produce({}, draft => {
        draft["192.168.0.20"] = dummyWorkerNode;
      });
      expect(dummyOrchestrator.getWorkerNodes()).toMatchObject(desiredWorkerNodeList);
    });
    it("should properly return its jobs list", () => {
      let dummyOrchestrator = Orchestrator();
      let dummyWorkerNode = WorkerNode("192.168.0.20", 6);
      let setResult = dummyOrchestrator.addWorkerNode(dummyWorkerNode);
      let dummyJob = Job(123, "Consumer", "./foo -bar=qux");
      dummyOrchestrator.addJob(dummyJob);
      const desiredJobList = produce({}, draft => {
        draft[123] = dummyJob;
      });
      expect(dummyOrchestrator.getJobs()).toMatchObject(desiredJobList);
    });
    // it("should properly return its job groups list", () => {
    //   let dummyOrchestrator = Orchestrator();
    //   let dummyWorkerNode = WorkerNode("192.168.0.20", 6);
    //   let setResult = dummyOrchestrator.addWorkerNode(dummyWorkerNode);
    //   let dummyJob = Job(123, "Consumer", "./foo -bar=qux");
    //   dummyOrchestrator.addJob(dummyJob);
    // });
    it("should properly return its job assignments list", () => {
      let dummyOrchestrator = Orchestrator();
      let dummyWorkerNode = WorkerNode("192.168.0.20", 6);
      dummyOrchestrator.addWorkerNode(dummyWorkerNode);
      let dummyJob = Job(123, "Consumer", "./foo -bar=qux");
      dummyOrchestrator.addJob(dummyJob);
      dummyOrchestrator.assignJob(dummyJob.id, dummyWorkerNode.ip, [1, 2, 3]);
      console.log(dummyOrchestrator.getJobAssignments());
      let desiredJobAssignmentObject = { "123": { workerNodeIp: "192.168.0.20", cpuNumbers: [1, 2, 3] } };
      expect(dummyOrchestrator.getJobAssignments()).toMatchObject(desiredJobAssignmentObject);
    });
    // methods
    it("should be able to add a WorkerNode to its list of worker nodes", () => {
      let dummyOrchestrator = Orchestrator();
      let dummyWorkerNode = WorkerNode("192.168.0.20", 6);
      let setResult = dummyOrchestrator.addWorkerNode(dummyWorkerNode);
      const desiredWorkerNodeList = produce({}, draft => {
        draft["192.168.0.20"] = dummyWorkerNode;
      });
      expect(setResult).toBe(true);
    });
    it("should **not** be able to add duplicate WorkerNode to its list of worker nodes", () => {
      let dummyOrchestrator = Orchestrator();
      let dummyWorkerNode1 = WorkerNode("192.168.0.20", 6);
      let dummyWorkerNode2 = WorkerNode("192.168.0.20", 6);
      let setResult1 = dummyOrchestrator.addWorkerNode(dummyWorkerNode1);
      let setResult2 = dummyOrchestrator.addWorkerNode(dummyWorkerNode2);
      expect(setResult1).toBe(true);
      expect(setResult2).toBe(false);
    });
    it("should be able to add a job to its jobs list", () => {
      let dummyOrchestrator = Orchestrator();
      let dummyJob = Job(123, "Consumer Job", "./foo -bar=baz");
      let setResult = dummyOrchestrator.addJob(dummyJob);
      expect(setResult).toBe(true);
    });
    it("should **not** be able to add duplicate jobs to its jobs list", () => {
      let dummyOrchestrator = Orchestrator();
      let dummyJob1 = Job(123, "Consumer Job", "./foo -bar=baz");
      let dummyJob2 = Job(123, "Consumer Job", "./foo -bar=baz");
      let setResult1 = dummyOrchestrator.addJob(dummyJob1);
      let setResult2 = dummyOrchestrator.addJob(dummyJob2);
      expect(setResult1).toBe(true);
      expect(setResult2).toBe(false);
    });
  });
});
