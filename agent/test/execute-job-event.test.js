/**
 * interrupt-job.test.js
 * @author Andrew Roberts
 */

import ExecuteJobEvent from "../src/execute-job-event";

describe("An ExecuteJobEvent instance", () => {
  describe("when initialized", () => {
    it("should properly return its job id", () => {
      let dummyExecuteJobEvent = ExecuteJobEvent(123, "Consumer");
      expect(dummyExecuteJobEvent.jobId).toBe(123);
    });
    it("should properly return its command string", () => {
      let dummyExecuteJobEvent = ExecuteJobEvent(123, "Consumer");
      expect(dummyExecuteJobEvent.commandString).toBe("Consumer");
    });
  });
});
