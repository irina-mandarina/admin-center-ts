<script setup lang="ts">
    import { ref, computed } from 'vue'
    import ActiveFilter from '~/objects/activeFilter';
    import Column from '~/objects/column';
    const props = defineProps({
        columns: Array<Column>,
        data: Array<Record<string, any>>,
        filters: Array<ActiveFilter>,
        pageSize: Number,
        focusedRow: Object
    })

    const emits = defineEmits(['show-row-details'])

    let sortItem = ref<string>('')
    let sortDirection = ref(0)
    let pageNumber = ref(1)
    let displayedData = computed (() => {
        let result = props.data
        if (props.data) {
            if (props.filters) {
                for (let filterIndex = 0; filterIndex < props.filters?.length!; filterIndex++) {
                    let filter = props.filters[filterIndex]
                    if (filter.type === 'dropdown') {
                        result = result!.filter((it: Record<string, unknown>) => {
                            if (it.hasOwnProperty(filter.key)) {
                                return it[filter.key] === filter.value
                            }
                        })
                    }
                    else if (filter.type === 'text') {
                        result = result!.filter((it: Record<string, string>) => it[filter.key]?.toLowerCase().includes(filter?.value?.toLowerCase()))
                    }
                }
            }
            

            let preSort = [...result!]
            if (sortDirection.value !== 0) {
                return preSort.sort((left: Record<string, string>, right: Record<string, string>) => {
                    if (left[sortItem.value!].toLowerCase() < right[sortItem.value].toLowerCase()) {
                        return -1 * sortDirection.value
                    }
                    else if (left[sortItem.value].toLowerCase() > right[sortItem.value].toLowerCase()) {
                        return 1 * sortDirection.value
                    }
                    else return 0
                })
            }    
        }
        

        return result
    })

    let page = computed(() => {
        return displayedData.value!.slice((pageNumber.value - 1) *  props.pageSize!, ((pageNumber.value - 1) * props.pageSize!) * props.pageSize! + props.pageSize!)
    })

    function previousPage() {
        if (pageNumber.value !== 1) {
            pageNumber.value--
        }
    }

    function nextPage() {
        let pages = displayedData.value!.length / props.pageSize!
        if (pages % 1 !== 0) {
            pages = (pages | 0) + 1
        }
        else {
            pages = pages | 0
        }
        if (pageNumber.value < pages) {
            pageNumber.value++
        }
    }

    function toggleSortDirection(column: string): void {
        if (sortItem.value !== column) {
            // new sort item
            // reset sort direction
            sortDirection.value = 0
        }
        sortItem.value = column
        if (sortDirection.value === 0) {
            sortDirection.value = 1
        }
        else if (sortDirection.value === 1) {
            sortDirection.value = -1
        }
        else {
            sortDirection.value = 0
        }
    }

    function objectsEqual(obj1: any, obj2: any): boolean {
        if (obj1 === null || obj2 === null && !(obj1 && obj2)) {
            return false
        }
        for (let i in obj1) {
            try {
               if (obj1[i] !== obj2[i]) {
                    return false
                } 
            } catch (e) {
                return false
            }
            
        }
        return true
    }
</script>

<template>
    <table class="table-fixed w-full">
        <thead>
            <tr>
                <th v-for="column in columns" class="text-left" @click="toggleSortDirection(column.key)">
                    {{ column.name }}
                    <i class="fa text-xs" :class="{
                        'fa-chevron-up': sortDirection === 1,
                        'fa-chevron-down': sortDirection === -1,
                        'invisible': sortDirection === 0 || sortItem !== column.key
                    }"/>
                </th>
            </tr>    
        </thead>
        <tbody>
            <tr v-for="row in page" @click="$emit('show-row-details', row)" class="border-b border-gray-300 py-2"
            :class="{
                'bg-slate-100': objectsEqual(focusedRow, row)
            }">
                <TableCell v-for="td in row" :data="td" />
            </tr>
        </tbody>
    </table>
    <div class="text-gray-800 p-4 w-1/2 float-left">
        Showing {{ page.length }} of {{ displayedData?.length }} items
    </div>
    <div class="inline text-gray-800 p-4 w-1/2 float-right text-right">
        <i @click="previousPage()" class="inline fa fa-chevron-left rounded-full bg-gray-200 p-1 mx-4" />
        {{ pageNumber }}
        <i @click="nextPage()" class="inline fa fa-chevron-right rounded-full bg-gray-200 p-1 mx-4" />
    </div>
</template>