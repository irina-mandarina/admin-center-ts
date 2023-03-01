<script setup lang="ts">
    import { ref } from 'vue'
    let userMenuOpened = ref<boolean>(false)
</script>

<template>
    <div class="bg-white border-b border-gray-300 w-full flex">

        <div class="w-1/6 border-b border-r border-gray-300 p-6 left-0">
            <span class="mx-3 bg-red-600 pl-0 pb-0 pr-2 pt-3 text-xs font-bold text-white">RMS</span>
            <span class="font-bold">Admin</span> Center
        </div>
        
        <div class="float-left w-3/4 text-xl font-bold py-5 px-6">
            Data bridge
        </div>
        
        <div class="w-1/12 float-right text-blue-600 overflow-hidden justify-evenly flex">
            <i class="fa-regular fa-bell py-6"/>
            <i class="fa-regular fa-circle-question py-6" />
            <i @click="userMenuOpened = !userMenuOpened" class="fa-regular fa-user py-6" />
        </div>

        <UserMenu v-if="userMenuOpened" />
        
        
    </div>
</template>