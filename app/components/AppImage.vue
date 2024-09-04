<template>
    <div v-if="isC2PA" class="relative w-full h-full">
        <div :class="{
            'right-2': placementC2PA === 'right',
            'left-2': placementC2PA === 'left',
        }" class="absolute top-2 z-99999">
            <NPopover trigger="hover" placement="left-start">
                <template #trigger>
                    <IconC2pa class="size-6" />
                </template>
                <AppC2PA :id-image="idImage" />
            </NPopover>
        </div>
        <NuxtImg bg-gray-50 v-bind="$attrs" format="auto" loading="lazy" densities="x1 x2" :src="idImage"
            :placeholder="[placeholder, 'blur']" />
    </div>
    <NuxtImg v-else bg-gray-50 v-bind="$attrs" format="auto" loading="lazy" densities="x1 x2" :src="idImage"
        :placeholder="[placeholder, 'blur']" />
</template>
<script setup lang="ts">
const AppC2PA = defineAsyncComponent(() => import("./AppC2PA.vue"));
const {
    idImage,
    placeholder,
    placementC2PA = "right",
} = defineProps<{
    idImage: string;
    placeholder?: string;
    isC2PA?: boolean;
    placementC2PA?: "left" | "right";
}>();
</script>
