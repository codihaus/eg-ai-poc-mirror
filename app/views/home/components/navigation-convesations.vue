<template>
    <div class="w-full bg-white">
        <NuxtLink v-for="({ title, link }, index) in recentThreads" :key="index" :to="link"
            class="flex-items gap-3 px-3 py-2 hover:bg-neutral-100 rounded-lg cursor-pointer">
            <div look="base" color="base" class="line-clamp-1">
                {{ title }}
            </div>
        </NuxtLink>
    </div>
</template>
<script setup lang='ts'>
import { readItems } from '@directus/sdk';

const coversations = [
    {
        title: "Welcome",
        link: "s",
    },
    {
        title: "Image Tools",
        link: " ",
    },
    {
        title: "Test Components: Improved Image",
        link: " ",
    },
    {
        title: "Test Cases for AppImage",
        link: " ",
    },
    {
        title: "Refactor Testing Components Composables",
        link: " ",
    },
    {
        title: "Test Components: Improved Image",
        link: " ",
    },
    {
        title: "Test Cases for AppImage",
        link: " ",
    },
    {
        title: "Refactor Testing Components Composables",
        link: " ",
    },
    {
        title: "Test Components: Improved Image",
        link: " ",
    },
    {
        title: "Test Cases for AppImage",
        link: " ",
    },
    {
        title: "Refactor Testing Components Composables",
        link: " ",
    },
    {
        title: "Test Components: Improved Image",
        link: " ",
    },
    {
        title: "Test Cases for AppImage",
        link: " ",
    },
    {
        title: "Refactor Testing Components Composables",
        link: " ",
    },

]

const currentUser = useState('currentUser')
const api = useNAD()

const { data: recentThreads, refresh } = await useAsyncData('recentThreads', () => api.request(readItems('chat_threads', {
    limit: 10,
    sort: '-date_created',
    filter: {
        user_created: currentUser.value?.id
    }
})), {
    transform: (response) => {
        console.log('res', response)
        return response?.items?.map((item) => ({
            title: item?.title,
            link: `/thread/${getThreadParamID(item?.id)}`
        }))
    }
})
</script>

<style scoped>
.router-link-active.router-link-exact-active {
    @apply bg-neutral-100
}
</style>