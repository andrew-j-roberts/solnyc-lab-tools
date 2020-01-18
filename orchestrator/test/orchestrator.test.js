// Tests follow this pattern:
// describe('[unit of work]', () => {
//   describe('when [scenario/context]', () => {
//     it('should [expected behaviour]', () => {});
//   });
// });
// https://github.com/mawrkus/js-unit-testing-guide#name-your-tests-properly

describe("A PerfHost instance", () => {
  describe("when initialized", () => {
    it("should properly return the ip it was initialized with", () => {
      let dummyPerfHost = PerfHost("192.168.0.20", 6);
      expect(dummyPerfHost.getIp()).toBe("192.168.0.21");
    });
    it("should properly return how many CPUs it has available", () => {
      let dummyPerfHost = PerfHost("192.168.0.20", 6);
      expect(dummyPerfHost.getNumCpus()).toBe(5);
    });
  });
});
