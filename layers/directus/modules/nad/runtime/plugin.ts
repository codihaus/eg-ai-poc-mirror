import {defineNuxtPlugin} from "nuxt/app";

export default defineNuxtPlugin(async (nuxtApp: any) => {
    nuxtApp.hook("app:created", async (renderContext) => {
        if (import.meta.server) {
            const currentUser = useState("currentUser")
            nuxtApp.payload.auth = {
                status: !!currentUser.value?.id,
                user: currentUser.value
            }
        }
        nuxtApp.provide("auth", nuxtApp.payload.auth)
    });
});
