import { defineStore } from 'pinia'
import { JobType } from '~/objects/jobType'
import { StatusType } from '~/objects/statusType'
import { ResourceType } from '~/objects/resourceType'
import { Job } from '~/objects/job'

// const defineStore = require('pinia')

type Jobs = {
    jobs: Job[];
  }

export const JobStore = defineStore('jobStore', {
    state: () =>
    ({
      jobs: [],
    } as Jobs),

    actions: {
        initJobs(): void {
                this.jobs = [
                    {name: "DB1.mdf", id: "42gret4w", type: JobType.Alter, owner: "John Smith", resource: ResourceType.Report, date: '1/30/2023 - 1/30/2023', status: StatusType.InProgress},
                    {name: "DB2.mdf", id: "rfsfvs424", type: JobType.Alter, owner: "John SmithSmith", resource: ResourceType.Profile, date: '1/30/2023 - 1/30/2023', status: StatusType.Success},
                    {name: "DB3.mdf", id: "42rfet4", type: JobType.Import, owner: "John SmithSmith", resource: ResourceType.Database, date: '1/30/2023 - 1/30/2023', status: StatusType.Failed},
                    {name: "DB4.mdf", id: "4565uytD", type: JobType.Upload, owner: "John SmithSmith", resource: ResourceType.Database, date: '1/30/2023 - 1/30/2023', status: StatusType.InProgress},
                    {name: "DB5.mdf", id: "4ty980p", type: JobType.Export, owner: "John SmithSmith", resource: ResourceType.Database, date: '1/30/2023 - 1/30/2023', status: StatusType.Success},
                    {name: "DB6.mdf", id: "1kiy78ytk345", type: JobType.Delete, owner: "John Smith", resource: ResourceType.ExposureSet, date: '1/30/2023 - 1/30/2023', status: StatusType.Failed},
                    {name: "DB7.mdf", id: "86ijt", type: JobType.Delete, owner: "John Smith", resource: ResourceType.ExposureSet, date: '1/30/2023 - 1/30/2023', status: StatusType.Cancelled}
            ]
        }   
    }
})