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
  it("should properly return its command string", () => {
    let baseState = new Map();
    let dummyOptionsMap = produce(baseState, draft => {
      draft.set("-cip", "localhost");
      draft.set("-stl", "foo");
    });
    let dummyCommand = SDKPerfCommand("c", dummyOptionsMap);
    expect(dummyCommand.getCommandString()).toBe(
      "sdkperf_c -cip=localhost -stl=foo"
    );
  });
});
