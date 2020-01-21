/**
 * job.test.js
 * @author Andrew Roberts
 */

import produce from "immer";
import Job from "../src/job";
import SDKPerfCommand from "../src/sdkperf-command";

// Tests follow this pattern:
// describe('[unit of work]', () => {
//   describe('when [scenario/context]', () => {
//     it('should [expected behaviour]', () => {});
//   });
// });
// https://github.com/mawrkus/js-unit-testing-guide#name-your-tests-properly

describe("A Job instance", () => {
  describe("when initialized", () => {
    it("should properly return its id", () => {
      /** initialize job */
      let baseState = new Map();
      let dummyOptionsMap = produce(baseState, draft => {
        draft.set("-cip", "localhost");
        draft.set("-stl", "foo");
      });
      let dummyCommand = SDKPerfCommand("c", dummyOptionsMap);
      let dummyJob = Job(1, "Basic C Consumer", dummyCommand);
      /* +-+-+-+-+-+-+-+-+-+-+-+-+-+- */
      expect(dummyJob.getId()).toBe(1);
    });
    it("should properly return its name", () => {
      /** initialize job */
      let baseState = new Map();
      let dummyOptionsMap = produce(baseState, draft => {
        draft.set("-cip", "localhost");
        draft.set("-stl", "foo");
      });
      let dummyCommand = SDKPerfCommand("c", dummyOptionsMap);
      let dummyJob = Job(1, "Basic C Consumer", dummyCommand);
      /* +-+-+-+-+-+-+-+-+-+-+-+-+-+- */
      expect(dummyJob.getName()).toBe("Basic C Consumer");
    });
    it("should properly return its command", () => {
      /** initialize job */
      let baseState = new Map();
      let dummyOptionsMap = produce(baseState, draft => {
        draft.set("-cip", "localhost");
        draft.set("-stl", "foo");
      });
      let dummyCommand = SDKPerfCommand("c", dummyOptionsMap);
      let dummyJob = Job(1, "Basic C Consumer", dummyCommand);
      /* +-+-+-+-+-+-+-+-+-+-+-+-+-+- */
      expect(dummyJob.getCommand()).toMatchInlineSnapshot(`
        Map {
          "-cip" => "localhost",
          "-stl" => "foo",
        }
      `);
    });
  });
  describe("when idle", () => {
    it("should be able to update its name", () => {
      /** initialize job */
      let baseState = new Map();
      let dummyOptionsMap = produce(baseState, draft => {
        draft.set("-cip", "localhost");
        draft.set("-stl", "foo");
      });
      let dummyCommand = SDKPerfCommand("c", dummyOptionsMap);
      let dummyJob = Job(1, "Basic D Consumer", dummyCommand);
      /* +-+-+-+-+-+-+-+-+-+-+-+-+-+- */
      dummyJob.setName("Basic C Consumer");
      expect(dummyJob.getName()).toBe("Basic D Consumer");
    });
    it("should be able to update its command", () => {
      /** initialize job */
      let baseState = new Map();
      let dummyOptionsMap = produce(baseState, draft => {
        draft.set("-cip", "localhost");
        draft.set("-stl", "foo");
      });
      let dummyCommand = SDKPerfCommand("c", dummyOptionsMap);
      let dummyJob = Job(1, "Basic C Consumer", dummyCommand);
      /* +-+-+-+-+-+-+-+-+-+-+-+-+-+- */
      /** update command */
      dummyOptionsMap = produce(baseState, draft => {
        draft.set("-cip", "192.168.0.0");
        draft.set("-stl", "bar");
      });
      dummyCommand = SDKPerfCommand("c", dummyOptionsMap);
      dummyJob.setCommand(dummyCommand);
      /* +-+-+-+-+-+-+-+-+-+-+-+-+-+- */
      expect(dummyJob.getCommand()).toMatchInlineSnapshot(`
        Map {
          "-cip" => "localhost",
          "-stl" => "foo",
        }
      `);
    });
  });
  describe("when running", () => {
    it("should **not** be able to update its name", () => {
      /** initialize and start job */
      let baseState = new Map();
      let dummyOptionsMap = produce(baseState, draft => {
        draft.set("-cip", "localhost");
        draft.set("-stl", "foo");
      });
      let dummyCommand = SDKPerfCommand("c", dummyOptionsMap);
      let dummyJob = Job(1, "Basic C Consumer", dummyCommand);
      dummyJob.start();
      /* +-+-+-+-+-+-+-+-+-+-+-+-+-+- */
      dummyJob.setName("Basic JavaScript Consumer");
      expect(dummyJob.getName()).toBe("Basic JavaScript Consumer");
    });
    it("should **not** be able to update its command", () => {
      /** initialize job */
      let baseState = new Map();
      let dummyOptionsMap = produce(baseState, draft => {
        draft.set("-cip", "localhost");
        draft.set("-stl", "foo");
      });
      let dummyCommand = SDKPerfCommand("c", dummyOptionsMap);
      let dummyJob = Job(1, "Basic C Consumer", dummyCommand);
      /* +-+-+-+-+-+-+-+-+-+-+-+-+-+- */
      /** update command */
      dummyOptionsMap = produce(baseState, draft => {
        draft.set("-cip", "192.168.0.0");
        draft.set("-stl", "bar");
      });
      dummyCommand = SDKPerfCommand("c", dummyOptionsMap);
      dummyJob.setCommand(dummyCommand);
      /* +-+-+-+-+-+-+-+-+-+-+-+-+-+- */
      expect(dummyJob.getCommand()).toMatchInlineSnapshot(`
        Map {
          "-cip" => "192.168.0.0",
          "-stl" => "bar",
        }
      `);
    });
  });
});
