import { JobType } from "./jobType"
import { ResourceType } from "./resourceType"
import { StatusType } from "./statusType"

export default interface Job {
    id: string,
    name: string,
    type: JobType | string,
    owner: string,
    resource: ResourceType | string,
    date: string,
    status: StatusType | string,
    [key: string]: string | null | JobType | ResourceType | StatusType
}