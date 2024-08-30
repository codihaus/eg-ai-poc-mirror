<template>
    <div class="container" v-if="static_page">
        <h1 class="text-32px text-black/800 font-bold my-8">
            {{ static_page?.title }}
        </h1>
        <wrapper-content :content="static_page?.content" class="pb-6" />

        <div class="flex-items gap-4 mt-10 mb-20">
            <p class="text-gray-900 font-bold font-bold">Share:</p>
            <a
                :href="share?.shareLinkFacebook"
                target="_bank"
                class="i-ph-facebook-logo transform hover:scale-140 hover:text-primary-01 duration-300 w-5 h-5 text-gray-900"
            ></a>
            <a
                :href="share?.shareLinkTwitter"
                target="_bank"
                class="i-ph-twitter-logo transform cursor-pointer hover:scale-140 w-5 h-5 hover:text-primary-01 duration-300 text-gray-900"
            ></a>
            <a
                :href="share?.shareLinkLinked"
                target="_bank"
                class="i-ph-linkedin-logo cursor-pointer transform hover:scale-140 w-5 h-5 hover:text-primary-01 duration-300 text-gray-900"
            ></a>
        </div>
    </div>
    <div v-else class="container text-center mt-30 m-auto">
        Trang bạn tìm kiếm không tồn tại
    </div>
</template>

<script setup lang="ts">
const route = useRoute();
const { getItems } = useDirectusItems();
const slug = computed(() => route.params.slug);

const { data: static_page }: any = await useAsyncData(
    "static_page" + slug.value,
    () =>
        getItems({
            collection: "static_pages",
            params: {
                limit: 1,
                filter: {
                    _and: [
                        {
                            slug: slug.value,
                        },
                        {
                            status: "published",
                        },
                    ],
                },
            },
        })
            .then((res) => res[0])
            .catch()
);

const share = ref({
    shareLinkFacebook: "",
    shareLinkTwitter: "",
    shareLinkLinked: "",
});

onMounted(() => {
    const href = window.location.href;
    share.value.shareLinkTwitter = `https://twitter.com/intent/tweet?text=${href}`;
    share.value.shareLinkFacebook = `https://www.facebook.com/sharer/sharer.php?u=${href} `;
    share.value.shareLinkLinked = `https://www.linkedin.com/shareArticle?mini=true&url=${href}`;
});
</script>
