import { defineNuxtPlugin } from "nuxt/app";

export default defineNuxtPlugin(async (nuxtApp: any) => {
    nuxtApp.hook("app:created", async () => {});
    nuxtApp.hook("page:start", async () => {});
});
