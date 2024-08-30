<template>
    <div
        :class="placement === 'top' ? 'top-0' : 'bottom-0'"
        class="w-full duration-300 ease-out bg-gray-100 shadow fixed z-50"
        ref="headerRef"
    >
        <ul class="flex-items gap-2 container my-3">
            <li>
                <NuxtLink class="p3 text-white rounded bg-primary" to="/"
                    >Home
                </NuxtLink>
            </li>
            <li
                class="p3 border-primary border rounded text-sm text-primary"
                @click="placement = 'bottom' === placement ? 'top' : 'bottom'"
            >
                Position - {{ placement }}
            </li>
            <li
                class="p3 border-primary border rounded text-sm text-primary"
                @click="stop"
            >
                Lock scroll
            </li>

            <li
                class="p3 border-primary border rounded text-sm text-primary"
                @click="isScrollLock = !isScrollLock"
            >
                Toogle scroll lock - {{ isScrollLock }}
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
const headerRef = ref<any>();
const { placement, stop, isScrollLock } = useHeaderScroll(headerRef);
const config = useConfigStore();
</script>
