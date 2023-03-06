<script setup lang="ts">
import { ref, computed } from 'vue'
import { cli } from 'webpack';
    const props = defineProps({
        name: String,
        selectKey: String,
        options: Array<string>,
        displayOption:  String
    })

    const emit = defineEmits([
        'choose-option'
    ])

    let chosenOption = ref<string>('')
    let opened = ref(false)
    let closeable = ref(true)
    let focusedInCounter = 0

    let buttonText = computed<String>((): String => {
        if (props.displayOption?.length! > 0) {
            return props.displayOption!
        }
        else if (chosenOption.value?.length > 0) {
            return chosenOption.value
        }
        else return props.name!
    })


    function chooseOption(key: string, option: string) {
        emit('choose-option', option)

        opened.value = false
        chosenOption.value = option
    }

    function focusIn() {
        console.log("focusing in: opened = " + opened.value + "; closeable = " + closeable.value)
        opened.value = !opened.value
        focusedInCounter++
    }

    function focusOut() {
        console.log("focusing out: opened = " + opened.value + "; closeable = " + closeable.value)   
        opened.value = closeable.value
        focusedInCounter = 0
    }

    function clicked() {
        console.log("clicked")
        if ((focusedInCounter > 1)) {
            opened.value = !opened.value
            focusedInCounter = 0
            if (opened.value) {
                focusedInCounter++
            }
        }
    }

</script>

<template>
    <div 
    @click="clicked"
    @focusin="focusIn" 
    @focusout="focusOut" 
    @mouseover="closeable = false" 
    @mouseleave="closeable = true" 
    class="relative inline-block border-box border border-gray-300">

        <button class="inline px-3 py-1 w-full " :class="{
            'shadow-sm': opened,
            'border-blue-400': opened
        }">
            <span class="float-left">{{ buttonText }}</span>

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