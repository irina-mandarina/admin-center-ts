<script setup lang="ts">
    defineProps({
        servers: Array<String>
    })
</script>

<template>
    <div class="border-b w-full p-5 shadow-inner bg-slate-50 flex">
        <i class="fa-solid fa-arrow-left text-blue-700 mx-4" />

        <!-- server picker -->
        <div class="mr-6 w-1/3">
            <Dropdown :options="servers" name="Servers" class="w-5/6" />
            <i class="fa-solid fa-copy mx-2" />
        </div>

        <!-- nav -->
        <InnerNav :tabs="['Databases', 'Logins', 'Jobs']" />

        <!-- storage used -->
        <div class="w-1/2 text-xs text-gray-500 font-bold float-right text-right">
            <span class="text-purple-600 text-lg">
                <i class="fa-solid fa-server" />
                699 GB
            </span>
            / 700 GB
        </div>
    </div>
</template>