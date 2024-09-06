<template>
    <!-- <ul class="space-y-2">
        <li v-for="asset in ListTypeAssets" :key="asset.title">
            <NuxtLink :to="asset.link" class="flex-items gap-2 px-4 py-2 border border-dashed rounded hover:border-primary duration-100">
                <span :class='asset.icon' class=" size-5 "></span>
                <span class="line-clamp-1 flex-1">{{ asset.title }}</span>
                <span class=" size-5 i-solar:arrow-right-linear text-primary"></span>
            </NuxtLink>
        </li>

    </ul> -->
    <n-collapse class="search-accordion" accordion @item-header-click="clickHeader">
        <n-collapse-item v-for="productType in listProductTypes" :title="productType?.title" :name="productType?.id">
            <template #arrow>
                <div :class="productType?.icon" class="text-xl"></div>
            </template>
            <template #header-extra>
                <div class="text-xl i-custom-arrow-right text-primary"></div>
            </template>
            <div class="p-4 bg-base-50 rounded-xl">
                <img src="" alt="">
            </div>
        </n-collapse-item>
    </n-collapse>
</template>

<script setup lang='ts'>
import { customEndpoint } from '@directus/sdk'

const route = useRoute()

const listProductTypes = [
    {
        title: 'Digital Art',
        slug: 'digital-art',
        icon: 'i-custom-image',
        id: 8
    },
    // {
    //     title: 'Search Stock videos',
    //     link: '#',
    //     icon: 'i-custom-video',
    // },
    // {
    //     title: 'Search Video template',
    //     link: '#',
    //     icon: 'i-custom-video-template',
    // },
    {
        title: 'Graphic',
        slug: 'graphic',
        icon: 'i-custom-graphic',
        id: 1
    },
    {
        title: 'Photo',
        slug: 'photo',
        icon: 'i-custom-image',
        id: 2
    },
    {
        title: 'Physical Art',
        slug: 'physical-art',
        icon: 'i-custom-image',
        id: 7
    }
]

const productType = ref(0)
const searchProductKey = useState('searchProductKey')

const api = useNAD()

const { data: products, pending, refresh: searchProducts } = await useAsyncData(
    () => productType.value > 0 ? api.request(customEndpoint({
        method: 'GET',
        path: `/eg-resources/products?search_text=${searchProductKey.value}&sort_by=[["date_created","asc"]]&status=[["neq","archived"], ["eq", "published"]]&type=[["eq", ${productType.value}]]&metadata={"pixel_dimension":"1024x768"}&page=1&limit=5`
    })) : {},
    {
        watch: [productType, searchProductKey]
    }
)

async function clickHeader({name, expanded, event}) {
    // productType.value = name
    // await searchProducts()
    await api.request(
        customEndpoint({
            method: 'POST',
            path: `/chat/message/`,
            body: JSON.stringify({
                thread_id: getThreadID(route?.params?.id),
                role: 'assistant',
                content: 'summary content to '
            })
        })
    )
}

</script>
<style lang="scss">
.n-collapse.search-accordion {
    --n-title-padding: 8px 16px;
    --n-item-margin: 8px 0 0 0;
    .n-collapse-item:not(:first-child) {
        border-top: 0;
    }
    .n-collapse-item__header {
        border-radius: 4px;
        border: 1px dashed #E1E5EA;
    }
    .n-collapse-item:first-child > .n-collapse-item__header {
        padding-top: 8px;
    }
}
</style>