<template>
    <div class="p-5 bg-[#FAF9FA]">
        <div class=" shadow-user-ai duration-100 bg-white p-4 rounded-2">
            <div v-if="!currentUser?.id">
                <NButton type="primary" ghost class="w-full mt-4 font-medium" @click="showLoginPopup = true">
                    Login
                </NButton>
                <lazy-n-modal v-model:show="showLoginPopup" class="py-8 px-4" :mask-closable="false" :close-on-esc="false">
                    <div class="w-full lg:w-xs mx-auto bg-white rounded-lg">
                        <login-form />
                    </div>
                </lazy-n-modal>
            </div>
            <div v-else>
                <div class="flex gap-2 items-center ">
                    <!-- <AppImage id-image="187619a8-d456-4001-8819-25bc9e91180e" :width="100" class="size-8 rounded-full" /> -->
                    <div class='flex-1'>
                        <div class="flex items-start">
                            <div look="baseBold" tag="h5" class="line-clamp-1 flex-1">{{ userFullName }} </div>
                            <div class=' px-2 py-0.5 bg-success-400 rounded-full'>
                                <p class="text-xs font-bold text-white">Free</p>
                            </div>
                        </div>
                        <div look="sm" tag="h5" class="line-clamp-1">{{ userMail }}</div>
    
                    </div>
                </div>
    
                <NButton type="primary" ghost class="w-full mt-4 font-medium">
                    Upgrade to Pro
                </NButton>
            </div>
        </div>

        <NuxtLink to="/" class="rounded-md border w-full flex-center bg-custom h-9 gap-2 mt-3">
            <span class="i-solar:arrow-left-linear size-5"></span>
            <span> Back to Engram </span>
        </NuxtLink>

    </div>
</template>

<script setup lang='ts'>
const currentUser = useState('currentUser')
const showLoginPopup = ref(false)

if( !currentUser.value?.id ) {
    showLoginPopup.value = true
}

console.log('user', currentUser.value)
const userFullName = computed(() => `${currentUser.value?.first_name} ${currentUser.value?.last_name}`);
const userMail = computed(() => currentUser.value?.email);
</script>

<style scoped></style>