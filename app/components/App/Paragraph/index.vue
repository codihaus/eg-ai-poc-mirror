<template>
    <Component :is="tag" :class="STYLES[look]">
        <slot />
    </Component>
</template>

<script setup lang="ts">
const STYLES = {
    superHeading:
        "font-extrabold text-transparent text-6xl sm:text-8xl md:text-6xl lg:text-8xl bg-clip-text bg-gradient-to-r from-red-600 to-pink-700",
    heading: "font-bold text-5xl",
    subParagraph: "text-zinc-400 text-lg font-semibold",
    paragraph: "text-lg text-gray-400",
    DEFAULT: "",
} as const;

const { look = "DEFAULT", tag = "p" } = defineProps<{
    look?: keyof typeof STYLES;
    tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "div";
}>();
</script>
