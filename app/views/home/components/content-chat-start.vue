<template>
    <div class="f-pt-80-200">
        <div class="text-center mx-auto">
            <div class="font-normal text-2xl text-base-900">Discover alternate investments</div>
            <div look="base" tag="p">
                Learn more about music industry, fine arts and youtubers
            </div>
        </div>
        <div class="grid grid-cols-3 gap-6 text-base-900 mt-10">
            <div v-for="(item) in suggestions" :key="item?.text" class="p-4 bg-white shadow-xl rounded-lg cursor-pointer hover:bg-primary hover:text-white" @click="submitSuggestion(item)">
                <div class="text-2xl text-center">{{ item?.text }}</div>
                <div></div>
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

const suggestions = ref([
    {
        text: 'Music industry'
    },
    {
        text: 'Fine arts'
    },
    {
        text: 'Youtubers'
    },
])

function handleSubmit(data: any) {
    // console.log('submit', data);
    emit('onSubmit', data);
}

function submitSuggestion(item) {
    emit('onSubmit', {
        message: `Tell me more about the ${item?.text} and what returns can i expect`
    });
}
</script>