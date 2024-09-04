<template>
    <div>
        <IconContentChatAi class="w-full -mb-40" />
        <div class="text-center mx-auto">
            <div look="h4" tag="h2" color="base" class="mb-3"> Engram AI: Your Digital Co-Pilot </div>
            <div look="base" tag="p">
                Unlock the Potential of AI. Seamlessly integrate machine learning, natural language understanding, and
                predictive analytics into your workflows. 
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
    console.log('submit', data);
    emit('onSubmit', data);
}
</script>