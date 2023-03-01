<script setup lang="ts">
import { ref, watch } from 'vue'
    const props = defineProps({
        name: String,
        selectKey: String,
        options: Array<String>,
        displayOption:  String
    })

    const emit = defineEmits([
        'choose-option'
    ])

    let chosenOption = ref<String>('')

    watch(props , () => {
        if (props.displayOption) chosenOption.value = props.displayOption
        else chosenOption.value = props.name!
    })
    let opened = ref(false)
    let closable = ref(true)


    function chooseOption(key: String, option: String) {
        emit('choose-option', option)

        opened.value = false
        chosenOption.value = option
    }
</script>

<template>
    <div @focusin="opened = !opened" 
    @focusout="opened = !closable" 
    @mouseover="closable = false" 
    @mouseleave="closable = true" 
    class="relative inline-block border-box border border-gray-300">

        <button class="inline px-3 py-1 w-full " :class="{
            'shadow-sm': opened,
            'border-blue-400': opened
        }">
            <span class="float-left">{{ chosenOption }}</span>

            <i v-if="!opened" class="fa fa-chevron-down float-right text-sm" :class="{
            'text-blue-500': opened
            }"/>
            <i v-if="opened" class="fa fa-chevron-up float-right text-sm" :class="{
            'text-blue-500': opened
            }"/>
        </button>

        <div v-if="opened" class="absolute my-1 right-0 left-0 border border-gray-300 shadow-md z-50">
            <div v-for="option in options" @click="chooseOption(selectKey!, option)" class="border-b border-gray-200 bg-white px-3 py-1 bg-white hover:bg-blue-50">
                {{ option }}
            </div>
        </div>
    </div>
</template>