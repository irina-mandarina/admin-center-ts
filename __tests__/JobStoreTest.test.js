import JobStore  from "../stores/JobStore.ts"
import  Job  from '~/objects/job'
import { test, expect } from 'vitest'

test("Test for Job Store", () => {
    const jobStore = JobStore()
    jobStore.initJobs()
    expect(jobStore.jobs).toBeDefined()
    // expect(jobStore.jobs).toEqual(expect.any(Job[]))
    const job = jobStore.jobs[0]
    const a = typeof job
    expect(typeof job).toBe('Job');
})