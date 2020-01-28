/**
 * index.js
 * @author Andrew Roberts
 */

import produce from "immer";

function ExecuteJobEvent({ jobId, commandString }) {
  return produce({}, draft => {
    draft.jobId = jobId;
    draft.commandString = commandString;
  });
}

function InterruptJobEvent({ jobId }) {
  return produce({}, draft => {
    draft.jobId = jobId;
  });
}

function JobInfoEvent({ jobId, data }) {
  return produce({}, draft => {
    draft.jobId = jobId;
    draft.data = data;
  });
}

function JobErrorEvent({ jobId, data }) {
  return produce({}, draft => {
    draft.jobId = jobId;
    draft.data = data;
  });
}

function JobExitEvent({ jobId, code, signal }) {
  return produce({}, draft => {
    draft.jobId = jobId;
    draft.code = code;
    draft.signal = signal;
  });
}

function JobStartEvent({ jobId }) {
  return produce({}, draft => {
    draft.jobId = jobId;
  });
}

export {
  ExecuteJobEvent,
  InterruptJobEvent,
  JobInfoEvent,
  JobErrorEvent,
  JobExitEvent,
  JobStartEvent
};
