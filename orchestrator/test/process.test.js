/**
 * process.test.js
 * @author Andrew Roberts
 */

import Process from "../src/process";

// Tests follow this pattern:
// describe('[unit of work]', () => {
//   describe('when [scenario/context]', () => {
//     it('should [expected behaviour]', () => {});
//   });
// });
// https://github.com/mawrkus/js-unit-testing-guide#name-your-tests-properly

describe("A Process instance", () => {
  describe("when initialized", () => {
    it("should return the commandString it was initialized with", () => {
      let dummyProcess = Process("./foo");
      expect(dummyProcess.getCommandString()).toBe("./foo");
    });
  });
  describe("when pid has not been set", () => {
    it("should be able to set pid.", () => {
      let dummyProcess = Process("./foo");
      let returnVal = dummyProcess.setPid(12345);
      expect(dummyProcess.getPid()).toBe(12345);
      expect(returnVal).toBe(true);
    });
  });
  describe("when pid has been set", () => {
    it("should not be able to set pid to a new number.", () => {
      let dummyProcess = Process("./foo");
      dummyProcess.setPid(12345);
      let returnVal = dummyProcess.setPid(10000);
      expect(dummyProcess.getPid()).toBe(12345);
      expect(returnVal).toBe(false);
    });
    it("should return correct pid when getPid is called.", () => {
      let dummyProcess = Process("./foo");
      dummyProcess.setPid(12345);
      expect(dummyProcess.getPid()).toBe(12345);
    });
  });
  describe("when in 'new' state", () => {
    it("should transition to 'ready' state when the onReceivedByAgent event handler is called", () => {
      let dummyProcess = Process("./foo");
      dummyProcess.setPid(12345);
      dummyProcess.eventHandlers.onReceivedByAgent();
      expect(dummyProcess.getCurrentState()).toBe("ready");
    });
  });
  describe("when in 'ready' state", () => {
    it("should transition to 'running' state when the onExecutedByAgent event handler is called", () => {
      /* setup process in "ready" state */
      let dummyProcess = Process("./foo");
      dummyProcess.setPid(12345);
      dummyProcess.eventHandlers.onReceivedByAgent();
      expect(dummyProcess.getCurrentState()).toBe("ready");
      /* +-+-+-+-+-+-+-+-+-+-+-+-+-+- */
      dummyProcess.eventHandlers.onExecutedByAgent();
      expect(dummyProcess.getCurrentState()).toBe("running");
    });
  });
  describe("when in 'running' state", () => {
    it("should transition to 'success' state when the onProcessExitedCode0 event handler is called", () => {
      /* setup process in "running" state */
      let dummyProcess = Process("./foo");
      dummyProcess.setPid(12345);
      dummyProcess.eventHandlers.onReceivedByAgent();
      dummyProcess.eventHandlers.onExecutedByAgent();
      expect(dummyProcess.getCurrentState()).toBe("running");
      /* +-+-+-+-+-+-+-+-+-+-+-+-+-+- */
      dummyProcess.eventHandlers.onProcessExitedCode0();
      expect(dummyProcess.getCurrentState()).toBe("success");
    });
    it("should transition to 'failure' state when the onProcessExitedCode1 event handler is called", () => {
      /* setup process in "running" state */
      let dummyProcess = Process("./foo");
      dummyProcess.setPid(12345);
      dummyProcess.eventHandlers.onReceivedByAgent();
      dummyProcess.eventHandlers.onExecutedByAgent();
      expect(dummyProcess.getCurrentState()).toBe("running");
      /* +-+-+-+-+-+-+-+-+-+-+-+-+-+- */
      dummyProcess.eventHandlers.onProcessExitedCode1();
      expect(dummyProcess.getCurrentState()).toBe("failure");
    });
  });
  describe("when in 'success' state", () => {
    it("should return correct exit code when getExitCode is called.", () => {
      /* setup process in 'success' state */
      let dummyProcess = Process("./foo");
      dummyProcess.setPid(12345);
      dummyProcess.eventHandlers.onReceivedByAgent();
      dummyProcess.eventHandlers.onExecutedByAgent();
      expect(dummyProcess.getCurrentState()).toBe("running");
      dummyProcess.eventHandlers.onProcessExitedCode0();
      /* +-+-+-+-+-+-+-+-+-+-+-+-+-+- */
      expect(dummyProcess.getExitCode()).toBe(0);
    });
  });
  describe("when in 'failure' state", () => {
    it("should return correct exit code when getExitCode is called.", () => {
      /* setup process in 'failure' state */
      let dummyProcess = Process("./foo");
      dummyProcess.setPid(12345);
      dummyProcess.eventHandlers.onReceivedByAgent();
      dummyProcess.eventHandlers.onExecutedByAgent();
      expect(dummyProcess.getCurrentState()).toBe("running");
      dummyProcess.eventHandlers.onProcessExitedCode1();
      /* +-+-+-+-+-+-+-+-+-+-+-+-+-+- */
      expect(dummyProcess.getExitCode()).toBe(1);
    });
  });
});
