// Tests follow this pattern:
// describe('[unit of work]', () => {
//   describe('when [scenario/context]', () => {
//     it('should [expected behaviour]', () => {});
//   });
// });
// https://github.com/mawrkus/js-unit-testing-guide#name-your-tests-properly

describe("An Orchestrator instance", () => {
  describe("when initialized", () => {
    it("should be able to add a WorkerNode to its list of allowed worker nodes", () => {
      let dummyPerfHost = PerfHost("192.168.0.20", 6);
      expect(dummyPerfHost.getIp()).toBe("192.168.0.21");
    });
  });
});
