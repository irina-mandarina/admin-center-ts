// import { JobStore } from "~/stores/JobStore"
const JobStore = require("~/stores/JobStore")
import {expect, describe, jest, test} from '@jest/globals';
import  Job  from '~/objects/job'

test("Test for Job Store", () => {
    const jobStore = JobStore()
    jobStore.initJobs()
    expect(jobStore.jobs).toBeDefined()
    // expect(jobStore.jobs).toEqual(expect.any(Job[]))
    const job = jobStore.jobs[0]
    expect(typeof job).toBe('Job');
})