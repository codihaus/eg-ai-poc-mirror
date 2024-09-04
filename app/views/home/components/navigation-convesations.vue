<template>
    <div class="w-full bg-white">
        <NuxtLink v-for="({ title, link }, index) in coversations" :key="index" :to="link"
            class="flex-items gap-3 px-3 py-2 hover:bg-neutral-100 rounded-lg cursor-pointer">
            <div look="base" color="base" class="line-clamp-1">
                {{ title }}
            </div>
        </NuxtLink>
    </div>
</template>
<script setup lang='ts'>
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

</script>

<style scoped>
.router-link-active.router-link-exact-active {
    @apply bg-neutral-100
}
</style>