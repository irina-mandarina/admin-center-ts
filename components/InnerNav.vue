<script setup lang="ts">
    defineProps({
        tabs: Array<string>
    })
</script>

<template>
    <ul class="flex text-sm font-bold text-gray-700 w-1/3">
        <Tab v-for="tab in tabs" :tab="tab" />
    </ul>
</template>