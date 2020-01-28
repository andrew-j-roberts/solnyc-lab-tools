/**
 * interrupt-job.test.js
 * @author Andrew Roberts
 */

import InterruptJobEvent from "../src/interrupt-job-event";

describe("An InterruptJobEvent instance", () => {
  describe("when initialized", () => {
    it("should properly return its job id", () => {
      let dummyInterruptJobEvent = InterruptJobEvent(123);
      expect(dummyInterruptJobEvent.jobId).toBe(123);
    });
  });
});
