/**
 * event-handlers.js
 * @author Andrew Roberts
 */

import Job from "./job";
import { JobCmdAddEvent } from "./events";

const handleAddJobEvent = (prismaClient, orchestrator) => async event => {
  // guard: attempt to parse event, fail if message is malformed
  let addJobEvent;
  try {
    addJobEvent = JobCmdAddEvent(JSON.parse(event.toString()));
  } catch (err) {
    console.error(
      "Message received by handleAddJobEvent was malformed, unable to process."
    );
    return false;
  }
  // guard: prevent agent from executing duplicate jobs
  if (agent.getJobs()[addJobEvent.id]) {
    return false;
  }

  // add job to postgres
  let res = await prismaClient.job.create({
    data: {
      ...addJobEvent
    }
  });

  // if job is successfully added to postgres, add to orchestrator
  if (res) {
    let job = Job(
      addJobEvent.id,
      addJobEvent.name,
      addJobEvent.command_language,
      addJobEvent.command_options
    );
    orchestrator.addJob(job);
  }

  return true;
};

export { handleAddJobEvent };
