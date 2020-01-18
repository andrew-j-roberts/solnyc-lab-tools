// it("should properly return the language it was initialized with", () => {
//   // immer semantics explaination:
//   // these two lines create the initial immutable options map,
//   // and passing `dummyOptionsMap` into produce is how to create the next update,
//   // e.g. let dummyOptionsMap_v2 = produce(dummyOptionsMap, draft => {})
//   let baseState = new Map();
//   let dummyOptionsMap = produce(baseState, draft => {
//     draft.set("-cip", "localhost");
//     draft.set("-stl", "foo");
//   });
//   // +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
//   let dummyCommand = SDKPerfCommand("c", dummyOptionsMap);
//   expect(dummyCommand.language).toBe("c");
// });
// it("should properly return the options it was initialized with", () => {
//   let baseState = new Map();
//   let dummyOptionsMap = produce(baseState, draft => {
//     draft.set("-cip", "localhost");
//     draft.set("-stl", "foo");
//   });
//   let dummyCommand = SDKPerfCommand("c", dummyOptionsMap);
//   expect(dummyCommand.options).toMatchInlineSnapshot(`
//     Map {
//       "-cip" => "localhost",
//       "-stl" => "foo",
//     }
//   `);
// });
