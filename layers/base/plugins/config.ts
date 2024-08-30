import { enabledMultiLanguage } from "~/config";
import { readItems } from "@directus/sdk";

export default defineNuxtPlugin(async (nuxtApp) => {
    const websiteConfig = useConfigStore();

    const fetchDataConfig = async (): Promise<void> => {
        try {
            const client = await APIServer.getInstance();
            if (enabledMultiLanguage) {
                let response = await client.request(
                    readItems("languages", {
                        fields: ['*'],
                    })
                )
                websiteConfig.languages = response?.items || [];
            }
        } catch (error) {
            createError({
                statusCode: 500,
                message: "[Nuxt] Error fetching languages",
            });
        }
    };

    await useAsyncData("config", () => fetchDataConfig(), {
        transform(data: any) {
            return { ...data, fetchedAt: new Date() };
        },
        getCachedData(key) {
            const data = nuxtApp.payload.data[key] || nuxtApp.static.data[key];
            if (!data) {
                return;
            }
            const expirationDate = new Date(data.fetchedAt);
            const timeCache = 1000 * 60 * 60 * 24 * 7; // 7 days
            expirationDate.setTime(expirationDate.getTime() + timeCache);
            const isExpired = expirationDate.getTime() < Date.now();
            if (isExpired) {
                return;
            }
            return data;
        },
    });
});
