/**
 * orchestrator.test.js
 * @author Andrew Roberts
 */

import Orchestrator from "../src/orchestrator";
import WorkerNode from "../src/worker-node";

// Tests follow this pattern:
// describe('[unit of work]', () => {
//   describe('when [scenario/context]', () => {
//     it('should [expected behaviour]', () => {});
//   });
// });
// https://github.com/mawrkus/js-unit-testing-guide#name-your-tests-properly

describe("An Orchestrator instance", () => {
  describe("when initialized", () => {
    it("should be able to add a WorkerNode to its list of allowed worker nodes when addWorkerNode is called", () => {
      let dummyOrchestrator = Orchestrator();
      let dummyWorkerNode = WorkerNode("192.168.0.20", 6);
      let setResult = dummyOrchestrator.addWorkerNode(dummyWorkerNode);
      expect(setResult).toBe(true);
    });
    it("should fail to add a malformed WorkerNode to its list of allowed worker nodes when addWorkerNode is called", () => {
      let dummyOrchestrator = Orchestrator();
      let malformedWorkerNode = null;
      let setResult = dummyOrchestrator.addWorkerNode(malformedWorkerNode);
      expect(setResult).toBe(false);
    });
  });
  describe("when passed a config file", () => {
    const dummyConfigObj = {
      workerNodes: [
        {
          ip: "192.168.0.20",
          numCpus: 4
        },
        {
          ip: "192.168.0.21",
          numCpus: 4
        }
      ]
    };
    it("should properly add the worker nodes specified in the config file to its allowed list of worker nodes", () => {
      let dummyOrchestrator = Orchestrator();
      dummyOrchestrator.interpret(dummyConfigObj);
      expect(dummyOrchestrator.getWorkerNodes()).toMatchInlineSnapshot(`
        Map {
          "192.168.0.20" => Object {
            "getIp": [Function],
            "getNumCpus": [Function],
          },
          "192.168.0.21" => Object {
            "getIp": [Function],
            "getNumCpus": [Function],
          },
        }
      `);
    });
  });
  describe("when allowed worker nodes have been added", () => {
    it("should return correct map of allowed worker nodes when getWorkerNodes is called", () => {
      let dummyOrchestrator = Orchestrator();
      let dummyWorkerNode1 = WorkerNode("192.168.0.20", 6);
      let dummyWorkerNode2 = WorkerNode("192.168.0.21", 6);
      let setResult1 = dummyOrchestrator.addWorkerNode(dummyWorkerNode1);
      let setResult2 = dummyOrchestrator.addWorkerNode(dummyWorkerNode2);
      // found this map snapshotting technique here: https://immerjs.github.io/immer/docs/complex-objects
      expect(dummyOrchestrator.getWorkerNodes()).toMatchInlineSnapshot(`
        Map {
          "192.168.0.20" => Object {
            "getIp": [Function],
            "getNumCpus": [Function],
          },
          "192.168.0.21" => Object {
            "getIp": [Function],
            "getNumCpus": [Function],
          },
        }
      `);
    });
    it("should remove a worker node from the workerNodes list when removeWorkerNode is called on its IP", () => {
      let dummyOrchestrator = Orchestrator();
      let dummyWorkerNode = WorkerNode("192.168.0.20", 6);
      let setResult = dummyOrchestrator.addWorkerNode(dummyWorkerNode);
      let removeResult = dummyOrchestrator.removeWorkerNode(
        dummyWorkerNode.getIp()
      );
      expect(removeResult).toBe(true);
      expect(
        dummyOrchestrator.getWorkerNodes().get(dummyWorkerNode.getIp())
      ).toBeUndefined();
    });
    it("should return false if removeWorkerNode is called on an IP that does not exist in workerNodes", () => {
      let dummyOrchestrator = Orchestrator();
      let dummyWorkerNode = WorkerNode("192.168.0.20", 6);
      let setResult = dummyOrchestrator.addWorkerNode(dummyWorkerNode);
      let removeResult = dummyOrchestrator.removeWorkerNode("192.168.0.21");
      expect(removeResult).toBe(false);
    });
  });
  describe("when allowed worker nodes have not been added", () => {
    it("should return an empty map when getWorkerNodes is called", () => {
      let dummyOrchestrator = Orchestrator();
      expect(dummyOrchestrator.getWorkerNodes()).toMatchInlineSnapshot(
        `Map {}`
      );
    });
  });
});
