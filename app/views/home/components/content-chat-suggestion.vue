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
        <n-collapse-item v-for="productType in listProductTypes" :title="productType?.title" :name="productType?.id" :disabled="loadingKeyword">
            <template #arrow>
                <div :class="productType?.icon" class="text-xl"></div>
            </template>
            <template #header-extra>
                <div class="text-xl i-custom-arrow-right text-primary"></div>
            </template>
            <div class="p-4 bg-base-50 rounded-xl">
                <div v-if="products?.length < 1 && !pending && ! loadingKeyword" class="">
                    Not found item!
                </div>
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <template v-if="pending || loadingKeyword">
                        <div v-for="(item, index) in new Array(4).fill({})" :class="{'col-span-3': index === 0}">
                            <n-skeleton :sharp="false" class="min-h-14"></n-skeleton>
                        </div>
                    </template>
                    <template v-else>
                        <div v-for="(item, index) in products" :key="item.id" :class="{'col-span-3': index === 0}">
                            <img :src="getAssetUrl(`${item?.thumbnail?.id}/${item?.thumbnail?.filename_download}`)" class="rounded">
                        </div>
                    </template>
                </div>
                <n-button v-if="products?.length > 0 && !pending && ! loadingKeyword" block class="mt-4" @click="viewMore(productType?.slug)">
                    View more
                </n-button>
            </div>
        </n-collapse-item>
    </n-collapse>
</template>

<script setup lang='ts'>
import { customEndpoint } from '@directus/sdk'
import { get } from 'lodash-es'

const route = useRoute()

const { getAssetUrl } = useNADUrl()

const listProductTypes = [
    {
        title: 'Digital Art',
        slug: 'digital-art',
        icon: 'i-custom-image',
        id: 8
    },
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
const loadingKeyword = ref(false)
const productType = ref(0)
const searchProductKey = useState('searchProductKey')

const api = useNAD()

const { data: products, pending, refresh: searchProducts } = await useAsyncData(
    () => productType.value > 0 && !!searchProductKey.value ? api.request(customEndpoint({
        method: 'GET',
        path: `/eg-resources/products?search=${searchProductKey.value}&type=${productType.value}`
    })) : {},
    {
        default: () => [],
        transform: (response) => response?.items,
        watch: [productType, searchProductKey]
    }
)

async function clickHeader({name, expanded, event}) {

    loadingKeyword.value = true
    const keyword = await api.request(
        customEndpoint({
            method: 'POST',
            path: `/chat/message/`,
            body: JSON.stringify({
                thread_id: getThreadID(route?.params?.id),
                role: 'assistant',
                type: 'search',
                content: 'summary last content as a keyword and return just one keyword'
            })
        })
    ).then((res) => get(res.reply, '0.text.value')).catch(() => {
        searchProductKey.value = null
        return false
    }).finally(() => {
        loadingKeyword.value = false
    })
    
    productType.value = name
    searchProductKey.value = keyword

    console.log('keyword', keyword)
}

function viewMore(slug) {
    window.location.href = `https://dev.scvengram.com/assets/${slug}?text=${searchProductKey.value}&sort=date_created`
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