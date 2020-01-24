/**
 * Job.test.js
 * @author Andrew Roberts
 */

import Job from "../src/job";
import SdkPerfCommand from "../src/sdkperf-command";

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
      let dummyOptionsObj = {
        "-cip": "localhost",
        "-stl": "foo"
      };
      let dummySdkPerfCommand = SdkPerfCommand("c", dummyOptionsObj);
      let dummyJob = Job(1, "Basic C Consumer", dummySdkPerfCommand);
      expect(dummyJob.id).toBe(1);
    });
    it("should properly return its name", () => {
      let dummyOptionsObj = {
        "-cip": "localhost",
        "-stl": "foo"
      };
      let dummySdkPerfCommand = SdkPerfCommand("c", dummyOptionsObj);
      let dummyJob = Job(1, "Basic C Consumer", dummySdkPerfCommand);
      expect(dummyJob.name).toBe("Basic C Consumer");
    });
    it("should properly return its command", () => {
      let dummyOptionsObj = {
        "-cip": "localhost",
        "-stl": "foo"
      };
      let dummySdkPerfCommand = SdkPerfCommand("c", dummyOptionsObj);
      let dummyJob = Job(1, "Basic C Consumer", dummySdkPerfCommand);
      expect(dummyJob.command.language).toBe("c");
      expect(dummyJob.command.options).toMatchInlineSnapshot(`
        Object {
          "-cip": "localhost",
          "-stl": "foo",
        }
      `);
    });
    it("should properly return its state", () => {
      let dummyOptionsObj = {
        "-cip": "localhost",
        "-stl": "foo"
      };
      let dummySdkPerfCommand = SdkPerfCommand("c", dummyOptionsObj);
      let dummyJob = Job(1, "Basic C Consumer", dummySdkPerfCommand);
      expect(dummyJob.stateMachine.value).toBe("new");
    });
  });
});
