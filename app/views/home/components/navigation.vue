<template>
    <nav class="rounded-3xl overflow-hidden flex flex-col h-full bg-white ">
        <div class="pl-5 pr-3 pt-5">
            <div class="text-center">
                <Logo class="mx-auto" />
            </div>
            <n-button type="primary" size="medium" class="w-full my-4">
                New Thread
                <template #icon>
                    <div class="i-custom-edit-circle size-6"></div>
                </template>
            </n-button>

            <NScrollbar class="max-h-[calc(100vh-356px)] pr-2">
                <div class="w-full bg-white space-y-1 ">
                    <NuxtLink
                        v-for="(item, index) in MENU_SETTINGS"
                        :key="index"
                        :to="item.link"
                        class="flex-items gap-3 px-4 py-2 leading-snug text-base hover:bg-neutral-100 rounded-lg cursor-pointer"
                        :active-class="!item?.link?.startsWith('#') ? `bg-neutral-100` : ''"
                        >
                        <span :class="item.icon" class='size-5'></span>
                        <span class="font-normal text-base-900 line-clamp-1">{{ item.name }}</span>
                    </NuxtLink>
                </div>

                <div class="flex-items gap-2 pl-3 border-t pt-4 mt-4">
                    <span class="i-solar:alt-arrow-down-linear size-5"></span>
                    <div look="baseBold" class="line-clamp-1 text-base-700">
                        Conversations history
                    </div>
                </div>

                <NavigationConvesations class="mt-4" />
            </NScrollbar>

        </div>
        <NavigationFooter class="mt-auto" />
    </nav>
</template>

<script setup lang='ts'>
import Logo from '~/app/components/logo.vue';
import NavigationFooter from './navigation-footer.vue';
import NavigationConvesations from './navigation-convesations.vue';


const MENU_SETTINGS = [
    {
        icon: "i-custom-chat",
        name: "Chats",
        link: "/",
    },
    {
        icon: "i-custom-question",
        name: "Updates & FAQ",
        link: "#chat",
    },
    {
        icon: "i-custom-subscription",
        name: "Subscriptions",
        link: "#subscriptions",
    },
    {
        icon: "i-custom-setting",
        name: "Settings",
        link: "#settings",
    }
]

</script>

<style scoped>
.router-link-active.router-link-exact-active {
    @apply bg-neutral-100
}
</style>