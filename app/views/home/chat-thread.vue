<template>
    <div class="bg-#EAE9EC h-screen grid grid-cols-[18rem_1fr] p-3 gap-3 ">
        <Navigation />
        <ContentChat/>
    </div>
</template>

<script setup lang='ts'>
import Navigation from './components/navigation.vue';
import ContentChat from './components/content-chat.vue';

definePageMeta({
    layout: 'none',
});

</script>