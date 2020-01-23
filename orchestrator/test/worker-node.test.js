/**
 * worker-node.test.js
 * @author Andrew Roberts
 */

import WorkerNode from "../src/worker-node";

// Tests follow this pattern:
// describe('[unit of work]', () => {
//   describe('when [scenario/context]', () => {
//     it('should [expected behaviour]', () => {});
//   });
// });
// https://github.com/mawrkus/js-unit-testing-guide#name-your-tests-properly

describe("A WorkerNode instance", () => {
  describe("when initialized", () => {
    it("should properly return the ip it was initialized with", () => {
      let dummyWorkerNode = WorkerNode("192.168.0.20", 6);
      expect(dummyWorkerNode.ip).toBe("192.168.0.20");
    });
    it("should properly return how many CPUs it has available", () => {
      let dummyWorkerNode = WorkerNode("192.168.0.20", 6);
      expect(dummyWorkerNode.numCpus).toBe(6);
    });
  });
});
