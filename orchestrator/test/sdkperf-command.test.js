/**
 * sdkperf-command.test.js
 * @author Andrew Roberts
 */

import SdkPerfCommand from "../src/sdkperf-command";

// Tests follow this pattern:
// describe('[unit of work]', () => {
//    describe('when [scenario/context]', () => {
//     it('should [expected behaviour]', () => {});
//   });
// });
// https://github.com/mawrkus/js-unit-testing-guide#name-your-tests-properly

describe("A SdkPerfCommand instance when initialized", () => {
  it("should properly return its language", () => {
    let dummyOptionsObj = {
      "-cip": "localhost",
      "-stl": "foo"
    };
    let dummySdkPerfCommand = SdkPerfCommand("c", dummyOptionsObj);
    expect(dummySdkPerfCommand.language).toBe("c");
  });
  it("should properly return its options map", () => {
    let dummyOptionsObj = {
      "-cip": "localhost",
      "-stl": "foo"
    };
    let dummySdkPerfCommand = SdkPerfCommand("c", dummyOptionsObj);
    expect(dummySdkPerfCommand.options).toMatchInlineSnapshot(`
      Object {
        "-cip": "localhost",
        "-stl": "foo",
      }
    `);
  });
  it("should properly return its command string", () => {
    let dummyOptionsObj = {
      "-cip": "localhost",
      "-stl": "foo"
    };
    let dummySdkPerfCommand = SdkPerfCommand("c", dummyOptionsObj);
    expect(dummySdkPerfCommand.getCommandString()).toBe("sdkperf_c -cip=localhost -stl=foo");
  });
});
