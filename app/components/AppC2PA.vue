<template>
    <div class="max-w-80 p-2 rounded-lg ">
        <template v-if="pending">
            <div role="status" class="animate-pulse w-74 h-full">
                <div class="w-30 h-8 my-3 bg-gray-100 rounded-sm"></div>
                <div class="w-60 h-8 my-3 bg-gray-100 rounded-sm"></div>
                <div class="w-50 h-8 my-3 bg-gray-100 rounded-sm "></div>
                <div class="w-70 h-10 rounded-full mt-20 bg-gray-100 "></div>
            </div>
        </template>
        <template v-else>
            <div class="duration-300 divide-y  w-74 min-h-50">
                <template v-if="infoC2PA">
                    <AppParagraph look="baseBold" tag="h3" class="pb-2">
                        Content Credentials
                    </AppParagraph>
                    <AppParagraph class="py-3" look="sm" tag="h4"><span class="!font-bold">
                            Produced by </span> {{ infoC2PA?.productBy }}
                    </AppParagraph>
                    <AppParagraph class="py-3" look="sm" tag="h4"><span class="!font-bold">
                            Website </span> {{ infoC2PA?.url }}
                    </AppParagraph>
                    <AppParagraph class="py-3" look="sm" tag="h4"><span class="!font-bold">
                            Owned by </span> {{ infoC2PA?.softwareAgent }}
                    </AppParagraph>
                    <AppParagraph class="py-3" look="sm" tag="h4"><span class="!font-bold">
                            App or device used </span> {{ infoC2PA?.appOrDeviceUsed }}
                    </AppParagraph>
                    <AppParagraph class="py-3" look="sm" tag="h4"><span class="!font-bold">
                            Date </span> {{ infoC2PA?.date }}
                    </AppParagraph>
                    <a :href="infoC2PA?.viewMoreUrl" target="_blank" class="block pt-4">
                        <NButton icon-placement="right" type="info" class="w-full rounded-full">Inspect </NButton>
                    </a>
                </template>
                <template v-else>
                    <AppParagraph look="baseBold" tag="h3" class="pb-2">
                        Content Credentials
                    </AppParagraph>
                    <AppParagraph class="py-3" look="sm" tag="h4">
                        No content credentials available for this image
                    </AppParagraph>
                </template>
            </div>

        </template>
    </div>

</template>

<script lang="ts" setup>
const { idImage } = defineProps<{
    idImage: string;
}>();

const { data: infoC2PA, pending } = await useLazyAsyncData(idImage, async () => {
    return await useC2pa(idImage).then((res) => {
        return res.activeManifestPropertiesV2;
    });
});

console.log(infoC2PA.value);



</script>
