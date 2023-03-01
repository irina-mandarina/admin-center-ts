<script setup>
    import { useRoute } from 'vue-router'
    let servers = ref(["Val's server"])
    const route = useRoute()
</script>

<template>
    <div class="h-screen fixed">
        <TopBar />
        <div class="flex h-full">
            <Navigation class="w-1/6 h-full" />
            <div class="w-5/6">
                <DataBridgeTopBar :servers="servers" class="w-full" />
                <slot />
            </div>
        </div>    
    </div>
    
</template>