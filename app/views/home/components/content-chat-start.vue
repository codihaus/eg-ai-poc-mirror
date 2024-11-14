<template>
    <div class="f-pt-80-200">
        <div class="text-center mx-auto">
            <div class="font-normal text-2xl text-base-900">Discover alternate investments</div>
            <div look="base" tag="p">
                Learn more about music industry, fine arts and youtubers
            </div>
        </div>
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 text-base-900 mt-10">
            <div v-for="(item) in suggestions" :key="item?.text" class="p-4 bg-white shadow-xl rounded-lg cursor-pointer hover:bg-primary hover:text-white" @click="submitSuggestion(item)">
                <div class="text-2xl text-center">{{ item?.text }}</div>
                <div></div>
            </div>
        </div>
        <ContentChatStartInput @on-submit="handleSubmit" class="mt-10 mx-auto max-w-3xl" />
    </div>
</template>

<script setup lang='ts'>
import { customEndpoint } from '@directus/sdk'
import ContentChatStartInput from './content-chat-start-input.vue';

const emit = defineEmits<{
    onSubmit: [any];
}>();

// const suggestions = ref([
//     {
//         text: 'Entertainment'
//     },
//     {
//         text: 'Arts'
//     },
//     {
//         text: 'Media'
//     },
//     {
//         text: 'Youtubers'
//     },
// ])

const api = useNAD()

const { data: productTypes } = await useAsyncData(
    'productTypes',
    () => api.request(customEndpoint({
        method: 'GET',
        path: `/eg-resources/product-type`
    })),
    {
        default: () => [],
        transform: (response) => response,
    }
)

const suggestions = computed(() => {
    let output = [
        ...productTypes.value?.map((item) => ({
            text: item?.name,
            id: item?.id
        })),
        {
            text: 'Youtubers',
        },
    ]
    return output
})

console.log('suggestions', suggestions.value)

function handleSubmit(data: any) {
    // console.log('submit', data);
    emit('onSubmit', data);
}

function submitSuggestion(item) {
    emit('onSubmit', {
        message: `Tell me more about the ${item?.text} and what returns can i expect`,
        id: item?.id
    });
}
</script>