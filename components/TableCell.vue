<script setup lang="ts">
    defineProps({
        data: String
    })
</script>

<template>
    <td class="py-2">
        <span class="p-1 rounded-full whitespace-nowrap" :class="{
        'text-green-900': data === 'Success',
        'bg-green-100': data === 'Success',

        'text-yellow-900': data === 'Cancelled',
        'bg-yellow-100': data === 'Cancelled',

        'text-blue-900': data === 'In progress',
        'bg-blue-100': data === 'In progress',

        'text-red-900': data === 'Failed',
        'bg-red-50': data === 'Failed'
        }">
           {{ data }} 
        </span>
    </td>
</template>