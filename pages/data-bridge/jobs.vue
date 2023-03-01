<script setup lang="ts">
    import { ref, computed, reactive, onBeforeMount, watch } from 'vue'
    import { useRoute, useRouter } from 'vue-router'
    import ActiveFilter from '~/objects/activeFilter';
    import { Job } from '~/objects/job';
    import { JobType } from '~/objects/jobType';
    import { ResourceType } from '~/objects/resourceType';
    import { StatusType } from '~/objects/statusType';
    import { JobStore } from '~/stores/JobStore'
    import _debounce from 'lodash/debounce'
    import _pickBy from 'lodash/pickBy'
    // import { RightSideDetails } from '~/objects/rightSideDetails'

    const jobStore = JobStore()
    jobStore.initJobs()
    
    let jobs = computed(() => jobStore.jobs)
    let columns = [
        { key: 'name', name:'Job name'},
        { key: 'id', name: 'Job ID'},
        { key: 'type', name: 'Job Type'},
        { key: 'owner', name: 'Owner'},
        { key: 'resource', name: 'Resource Type'},
        { key: 'date', name: 'Date Range'},
        { key: 'status', name: 'Status'}]

    let pageSize = ref(5)

    let activeFilters = ref<Array<ActiveFilter>>([])

    let filters =  reactive<Job>({
        name: '',
        id: '',
        owner: '',
        type: '',
        date: '',
        resource: '',
        status: '',
    })

    const router = useRouter()
    const route = useRoute()
    let ok = ref<boolean>(false)

    let rightSideInfo = ref<Map<string, string> | null>(null)
    let rightSideTitle = ref<string | null>(null)
    let focusedJob = ref<Job | null>(null)
    let rightSideDetails = ref<string | null>(null)

    onBeforeMount(() => {
        filters.name = route?.query?.name?.toString() ?? ''
        filters.owner = route?.query?.owner?.toString() ?? ''
        filters.id = route?.query?.id?.toString() ?? ''
        filters.type = route?.query?.type?.toString() ?? ''
        filters.resource = route?.query.resource?.toString() ?? ''
        filters.status = route?.query?.status?.toString() ?? ''

        fillActiveFilters()
        ok.value = true
    })

   
    watch(filters, _debounce(() => {
        fillActiveFilters()
    }, 500))

    function fillActiveFilters(): void {
        let query: Record<string, string> = {}
        activeFilters.value = []
        for (let filter in _pickBy(filters)) {
            query[filter] = filters[filter]?.toString() ?? ''
            let type
            if (['type', 'resource', 'status'].includes(filter)) type = 'dropdown'
            else type = 'text'
            activeFilters.value.push({
                key: filter,
                value: filters[filter],
                type
            })

        }
        router.push({query})
    }

    function setStatus(status: StatusType) {
        filters.status = status
    }

    function setJobType(job: JobType) {
        filters.type = job
    }

    function setResource(resource: ResourceType) {
        filters.resource = resource
    }

    function showJobDetails(job: Job) {
        clearJobDetails()
        rightSideTitle.value = "Job ID: " + job.id
        rightSideInfo.value = new Map()
        for (let jobDetail in job) {
            rightSideInfo.value.set(columns.filter((col) => col.key === jobDetail)[0].name, job[jobDetail]?.toString() ?? '')
        }
        focusedJob.value = job
        console.log(focusedJob.value)
        if (job.type === JobType.Export) {
            // rightSideDetails.value = {
            //     text: "Download database",
            //     database: "mydb",
            //     type: "download"
            // }
        }
    }

    function clearJobDetails(): void {
        rightSideInfo.value = null
        rightSideTitle.value = null
        focusedJob.value = null
        rightSideDetails.value = null
    }

</script>

<template>
    <NuxtLayout name="data-bridge">
        <div class="relative h-full">
            <div class="font-bold text-lg px-8 py-6">
                Jobs
            </div>

            <div class="w-full px-8">
                <!-- filters -->
                <div class="flex justify-between mb-4">
                    <input 
                        v-model="filters.name"
                        class="border-gray-300 border focus:border-blue-500 focus:outline-none p-1 border-box"
                        placeholder="Filter by keyword"
                        type="search" />

                    <input 
                        v-model="filters.id"
                        class="border-gray-300 border focus:border-blue-500 focus:outline-none p-1 border-box" 
                        placeholder="Job ID"
                        type="search" />

                    <Dropdown @choose-option="setJobType"
                        :options="Object.values(JobType)" name="Job Type" :displayOption="filters.type" select-key="type" class=" w-36" />

                    <input 
                    v-model="filters.owner"
                    class="border-gray-300 border focus:border-blue-500 focus:outline-none p-1 border-box" 
                    placeholder="Owner"/>

                    <Dropdown @choose-option="setResource"
                        :options="Object.values(ResourceType)" name="Resource Type" :displayOption="filters.resource" select-key="resourceType" class="w-40" />

                    <Dropdown @choose-option="setStatus"
                    :options="Object.values(StatusType)" name="Status" :displayOption="filters.status" select-key="status" class="w-36" />
                </div>

                <TableTable v-if="ok" :columns="columns" :data="jobs" :filters="activeFilters" :page-size="pageSize" :focused-row="focusedJob" @show-row-details="showJobDetails" />
            </div>
        
            <RightSideBar v-if="rightSideTitle !== null" :title="rightSideTitle" :info-map="rightSideInfo" :details="rightSideDetails" @close-bar="clearJobDetails" />

        </div>
    </NuxtLayout>
</template>