/**
 * events.js
 * @author Andrew Roberts
 */

import produce from "immer";

function JobCmdAddEvent({ id, name, command_language, command_options }) {
  return produce({}, draft => {
    draft.id = id;
    draft.name = name;
    draft.command_language = command_language;
    draft.command_options = command_options;
  });
}

export { JobCmdAddEvent };
