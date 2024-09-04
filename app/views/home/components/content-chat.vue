<template>
    <div class="rounded-3xl overflow-hidden bg-white flex relative">
        <ContentChatHeader v-if="isHaveConversations" class="absolute top-0 w-full right-0 left-0 z-9 ease duration-500 " />
        <div class="flex-1 flex pt-14 pb-15">
            <NScrollbar class="flex-1 w-full mx-4">
                <div class="max-w-3xl mx-auto pb-20">
                    <ContentChatConversations :coversations="coversations" />
                    <ContentChatStart v-if="!isHaveConversations" @on-submit="handleSubmit" />
                </div>
            </NScrollbar>

            <div :class="isHaveConversations ? 'w-70' : 'w-0'" class="relative overflow-hidden ease duration-500 ">
                <ContentChatSuggestion class="absolute left-0 top-4 px-4 bottom-0 w-70" />
            </div>
        </div>

        <div class="absolute bg-white pb-2 bottom-0 w-full right-0 left-0 z-9 flex">
            <ContentChatInput v-if="isHaveConversations" @on-submit="handleSubmit" class="max-w-3xl mx-auto flex-1" />
            <div :class="isHaveConversations ? 'w-70' : 'w-0'" class="duration-500"></div>
        </div>
    </div>
</template>


<script setup lang='ts'>
import ContentChatHeader from './content-chat-header.vue';
import ContentChatStart from './content-chat-start.vue';
import ContentChatInput from './content-chat-input.vue';
import ContentChatSuggestion from './content-chat-suggestion.vue';
import ContentChatConversations from './content-chat-conversations.vue';
const coversations = ref<any>([]);

function handleSubmit(data: any) {
    coversations.value = _coversations
    console.log('submit', data);

}

const isHaveConversations = computed(() => {
    return coversations.value.length > 0;
})



const _coversations = [
    {
        sender: {
            name: "User Engram AI",
            avatar: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
        },
        message: "Top landscape photographers awarded globally in 2024.",
        sources: [
            {
                name: "PetaPixel",
                link: "https://petapixel.com/2024/01/01/top-landscape-photographers-awarded-globally-in-2024/"
            },
            {
                name: "Fstoppers",
                link: "https://fstoppers.com/2024/01/01/top-landscape-photographers-awarded-globally-in-2024-2/"
            },
            {
                name: "Digital Photography Review",
                link: "https://dpreview.com/2024/01/01/top-landscape-photographers-awarded-globally-in-2024-3/"
            }
        ],
        date: "20:22",
        type: "text",
        content: `<ul><li>Revenue in the NFT market is forecasted to reach US$683.9m in 2024.</li><li>The market is projected to experience an annual growth rate of -11.01% (CAGR 2024-2025), resulting in a total revenue of US$608.6m by 2025.</li><li>In 2024, the average revenue per user in the NFT market is estimated to be US$59.0.</li><li>When comparing the global market, United States is expected to generate the highest revenue, reaching US$119,800.0k in 2024.</li><li>The number of users in the NFT market is anticipated to reach 11.64m users by 2025.</li><li>User penetration is projected to be 0.15% in 2024 and is expected to increase to 0.15% by 2025.</li><li>Despite the global popularity of NFTs, the United States remains the dominant market due to its robust digital infrastructure and strong investor interest.</li></ul>`
    },
    {
        sender: {
            name: "User Engram AI",
            avatar: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
        },
        message: "Top landscape photographers awarded globally in 2024.",
        sources: [
            {
                name: "PetaPixel",
                link: "https://petapixel.com/2024/01/01/top-landscape-photographers-awarded-globally-in-2024/"
            },
            {
                name: "Fstoppers",
                link: "https://fstoppers.com/2024/01/01/top-landscape-photographers-awarded-globally-in-2024-2/"
            },
            {
                name: "Digital Photography Review",
                link: "https://dpreview.com/2024/01/01/top-landscape-photographers-awarded-globally-in-2024-3/"
            }
        ],
        date: "20:22",
        type: "text",
        content: `<p>As our chart isHaveConversationss, a total of six states have enacted right-to-repair laws so far, with five doing so in the past three years. Colorado established the first of these bills in 2022 concerning wheelchair repairs. Another bill expanded this right to agricultural equipment, the most common sector targeted in right-to-repair legislation next to consumer electronics, in 2023, according to the <a href="https://www.ncsl.org/technology-and-communication/right-to-repair-2023-legislation" target="_blank">National Conference of State Legislatures</a>. </p>`
    }
]

</script>

<style scoped>
.slide-fade-enter-active {
    transition: all 0.1s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
}
</style>