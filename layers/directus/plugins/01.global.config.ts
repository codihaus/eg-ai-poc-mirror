import {BACKEND_URL} from "@directusLayer/config";
import {withoutTrailingSlash} from "ufo";

export default defineNuxtPlugin(async (nuxtApp) => {
    if (import.meta.server) {
        const runtimeConfig = useRuntimeConfig();
        runtimeConfig.public.ASSET_URL = BACKEND_URL + "/assets";
        runtimeConfig.public.API_URL = withoutTrailingSlash(runtimeConfig.public.url) + "/api";
    }
});
