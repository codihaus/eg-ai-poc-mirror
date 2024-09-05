<template>
    <div class="f-pt-80-200">
        <div class="text-center mx-auto">
            <div class="font-normal text-2xl text-base-900">Discover alternate investments</div>
            <div look="base" tag="p">
                Learn more about fine arts, movies, music and youtubers
            </div>
        </div>
        <ContentChatStartInput @on-submit="handleSubmit" class="mt-10 mx-auto max-w-3xl" />
    </div>
</template>

<script setup lang='ts'>
import ContentChatStartInput from './content-chat-start-input.vue';

const emit = defineEmits<{
    onSubmit: [any];
}>();

function handleSubmit(data: any) {
    // console.log('submit', data);
    emit('onSubmit', data);
}
</script>