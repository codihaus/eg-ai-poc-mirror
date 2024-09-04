<template>
    <div class="divide-y">
        <div v-for="(coversation) in coversations" class="py-14">
            <div class="mb-6">
                <!-- <div class="size-8 object-cover rounded-full overflow-hidden">
                    <img :src="coversation.sender.avatar" class="size-full" />
                </div> -->
                <div class="font-semibold text-xl">
                    {{ coversation.message }}
                </div>
            </div>

            <div class="space-y-4 my-6">
                <div class="font-semibold text-lg line-clamp-1 text-base-700">
                    Sources
                </div>
                <ContnetChatDisplayFiles :files="coversation.sources" />
            </div>

            <div class="rounded-2xl overflow-hidden grid grid-cols-[4rem_1fr]">
                <div class="p-4 bg-base-100">

                </div>
                <div class="px-4 py-6 bg-base-50 prose">
                    <div v-html="coversation.content"></div>
                </div>
            </div>
        </div>
    </div>

</template>


<script setup lang='ts'>
import ContnetChatDisplayFiles from './contnet-chat-display-files.vue';
const { } = defineProps<{
    coversations: any[];
}>();

</script>
