<script lang="ts" setup>
    defineProps({
        sortDir: String
    })
</script>

<template>
    <i v-if="sortDir === 'asc'" class="fa fa-chevron-up text-sm"/>
    <i v-else-if="sortDir === 'desc'" class="fa fa-chevron-down text-sm"/>
    <i v-else class="fa fa-chevron-down text-sm invisible"/>
</template>