/**
 * events.js
 * @author Andrew Roberts
 */

import produce from "immer";

function JobCmdExecuteEvent({ jobId, commandString, timestamp }) {
  return produce({}, draft => {
    draft.jobId = jobId;
    draft.commandString = commandString;
    draft.timestamp = timestamp;
  });
}

function JobCmdInterruptEvent({ jobId, timestamp }) {
  return produce({}, draft => {
    draft.jobId = jobId;
    draft.timestamp = timestamp;
  });
}

function JobLogEvent({ jobId, level, data, timestamp }) {
  return produce({}, draft => {
    draft.jobId = jobId;
    draft.level = level;
    draft.data = data;
    draft.timestamp = timestamp;
  });
}

function JobSysEvent({ jobId, type, data, timestamp }) {
  return produce({}, draft => {
    draft.jobId = jobId;
    draft.type = type;
    draft.data = data;
    draft.timestamp = timestamp;
  });
}

export { JobCmdExecuteEvent, JobCmdInterruptEvent, JobLogEvent, JobSysEvent };
