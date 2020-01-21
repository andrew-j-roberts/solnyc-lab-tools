/**
 * sdkperf-command.test.js
 * @author Andrew Roberts
 */

import SDKPerfCommand from "../src/sdkperf-command";
import produce from "immer";

// Tests follow this pattern:
// describe('[unit of work]', () => {
//    describe('when [scenario/context]', () => {
//     it('should [expected behaviour]', () => {});
//   });
// });
// https://github.com/mawrkus/js-unit-testing-guide#name-your-tests-properly

describe("A SDKPerfCommand instance when initialized", () => {
  it("should properly return its language", () => {
    let baseState = new Map();
    let dummyOptionsMap = produce(baseState, draft => {
      draft.set("-cip", "localhost");
      draft.set("-stl", "foo");
    });
    let dummySdkPerfCommand = SDKPerfCommand("c", dummyOptionsMap);
    expect(dummySdkPerfCommand.getLanguage()).toBe("c");
  });
  it("should properly return its options map", () => {
    let baseState = new Map();
    let dummyOptionsMap = produce(baseState, draft => {
      draft.set("-cip", "localhost");
      draft.set("-stl", "foo");
    });
    let dummySdkPerfCommand = SDKPerfCommand("c", dummyOptionsMap);
    expect(dummySdkPerfCommand.getOptions()).toMatchInlineSnapshot(`
      Map {
        "-cip" => "localhost",
        "-stl" => "foo",
      }
    `);
  });
  it("should properly return its command string", () => {
    let baseState = new Map();
    let dummyOptionsMap = produce(baseState, draft => {
      draft.set("-cip", "localhost");
      draft.set("-stl", "foo");
    });
    let dummySdkPerfCommand = SDKPerfCommand("c", dummyOptionsMap);
    expect(dummySdkPerfCommand.getCommandString()).toBe("sdkperf_c -cip=localhost -stl=foo");
  });
});
