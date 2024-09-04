<template>
    <ul class="space-y-2">
        <li v-for="asset in ListTypeAssets" :key="asset.title">
            <NuxtLink :to="asset.link" class="flex-items gap-2 px-4 py-2 border border-dashed rounded hover:border-primary duration-100">
                <span :class='asset.icon' class=" size-5 "></span>
                <span class="line-clamp-1 flex-1">{{ asset.title }}</span>
                <span class=" size-5 i-solar:arrow-right-linear text-primary"></span>
            </NuxtLink>
        </li>

    </ul>
</template>

<script setup lang='ts'>

const ListTypeAssets = [
    {
        title: 'Search photos',
        link: 'i-solar:gallery-linear',
        icon: 'i-solar:gallery-linear',
    },
    {
        title: 'Search Stock videos',
        link: '#',
        icon: 'i-solar:video-frame-linear',
    },
    {
        title: 'Search Video template',
        link: '#',
        icon: 'i-solar:ghost-smile-linear',
    },
    {
        title: 'Search Graphic',
        link: '#',
        icon: 'i-solar:video-frame-linear',
    },
    {
        title: 'Search Audio',
        link: '#',
        icon: 'i-solar:music-note-linear',
    }
]

</script>