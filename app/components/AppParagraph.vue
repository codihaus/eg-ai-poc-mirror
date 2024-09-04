<template>
    <component :is="tag" v-bind="bindClass">
        <slot />
    </component>
</template>

<script setup lang="ts">
const attrs = useAttrs();
const STYLES = {
    xs: "font-normal text-11px text-base-700",
    sm: "font-normal text-13px text-base-700",
    smLg: "font-medium text-13px text-base-700",
    base: "font-normal text-15px leading-5 text-base-700",
    baseBold: "font-semibold text-15px leading-5",
    baseMedium: "font-medium text-15px leading-5 text-base-900",
    baseLg: "font-normal text-lg text-base-700",
    baseLgMedium: "font-medium text-lg",
    h6: "font-semibold text-15px leading-5.25 text-base-700",
    h5: "font-semibold text-lg",
    h4: "font-semibold text-xl",
    h3: "font-semibold text-2xl",
    h2: "font-semibold leading-9.75 text-22px sm:text-26px md:text-28px",
    h1: "font-semibold text-2xl xs:text-3xl sm:text-4xl",
    jumbotron: "font-semibold text-4xl sm:text-5xl",
    jumbotronLg: "font-semibold text-5xl sm:text-6xl",
    jumbotronXl: "font-semibold text-18 leading-23.5",
    default: "",
} as const;

const COLORS = {
    base: "text-base-900",
    primary: "text-primary",
    secondary: "text-secondary",
    warning: "text-warning",
    danger: "text-danger",
    success: "text-success",
    white: "text-white",
    link: "text-link",
    default: "",
} as const;

const {
    look = "default",
    tag = "p",
    color = "default",
} = defineProps<{
    look?: keyof typeof STYLES;
    color?: keyof typeof COLORS;
    tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "div" | "span";
}>();

const mergerClasses = ''
const bindClass = ''
// const mergerClasses = computed(() => {
//     const classes = attrs.class?.toString() || '';
//     if (color !== "default" || attrs.class?.toString().includes("text-")) {
//         // return `${STYLES[look]?.replace(/text-base-700/g, " ")} ${COLORS[color]} ${classes}`;
//     }
//     return `${STYLES[look]} ${COLORS[color]} ${classes}`;
// });

// const bindClass = computed(() => {
//     const classes = mergerClasses.value?.trim()
//     return classes ? { class: classes } : {};
// });

</script>