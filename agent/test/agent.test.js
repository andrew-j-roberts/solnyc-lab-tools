/**
 * agent.test.js
 * @author Andrew Roberts
 */

import Agent from "../src/agent";
import Process from "../src/process";
import shelljs from "shelljs";

describe("An Agent instance", () => {
  describe("when initialized", () => {
    it("should be able to add a process to its processes list", () => {
      let dummyAgent = Agent();
      let dummyProcessRef = shelljs.exec(`sleep 1`, { async: true });
      let dummyProcess = Process(12345, dummyProcessRef);
      let addProcessResult = dummyAgent.addProcess(dummyProcess);
      expect(addProcessResult).toBe(true);
    });
    it("should be able to interrupt a running process", () => {
      let dummyAgent = Agent();
      let dummyProcessRef = shelljs.exec(`sleep 1`, { async: true });
      let dummyProcess = Process(12345, dummyProcessRef);
      dummyAgent.addProcess(dummyProcess);
      let interruptResult = dummyAgent.interruptProcess(12345);
      expect(interruptResult).toBe(true);
    });
    it("should not be able to interrupt a stopped process", () => {
      let dummyAgent = Agent();
      let dummyProcessRef = shelljs.exec(`sleep 1`, { async: true });
      let dummyProcess = Process(12345, dummyProcessRef);
      dummyAgent.addProcess(dummyProcess);
      let interruptResult = dummyAgent.interruptProcess(12345);
      expect(interruptResult).toBe(true);
    });
    it("should be able to remove a process from its processes list", () => {
      let dummyAgent = Agent();
      let dummyProcessRef = shelljs.exec(`sleep 1`, { async: true });
      let dummyProcess = Process(12345, dummyProcessRef);
      dummyAgent.addProcess(dummyProcess);
      let removeResult = dummyAgent.removeProcess(12345);
      expect(removeResult).toBe(true);
    });
    it("should properly return its processes list", () => {
      let dummyAgent = Agent();
      let dummyProcessRef = shelljs.exec(`sleep 1`, { async: true });
      let dummyProcess = Process(12345, dummyProcessRef);
      dummyAgent.addProcess(dummyProcess);
      expect("12345" in dummyAgent.getProcesses()).toBe(true);
      expect(dummyAgent.getProcesses()).toEqual(expect.objectContaining({ 12345: expect.any(Object) }));
    });
  });
});
