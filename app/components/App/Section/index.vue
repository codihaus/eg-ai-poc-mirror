<template>
    <div class="relative my-14">
        <slot />
    </div>
</template>

<script setup lang="ts">
defineProps<{
    innerClass?: string;
}>();
</script>
