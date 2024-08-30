import {readMe, refresh} from "@directus/sdk"
export default defineNuxtRouteMiddleware(async (to) => {
    const runtimeConfig = useRuntimeConfig()
    const logger = Logger()

    if (!runtimeConfig.app?.directus?.auto_fetch_user) {
        logger.info("Skipping fetching user")
        return
    }

    // Defined at layers/directus/plugins/02.directus.instance.ts
    let {$userClient}: any = useNuxtApp()
    if (!$userClient) return


    const currentUser = useState("currentUser", () => {
        return {}
    })

    if (await $userClient.getToken()) {

        currentUser.value = await $userClient.request(
            readMe({
                fields: [
                    "*",
                    runtimeConfig.app?.directus?.user_fields ?? []
                ]
            })
        ).catch(() => {
            return {}
        });

        if (import.meta.browser) {
            //Only refresh token on browser
            setTimeout(() => {
                $userClient.request(
                    refresh()
                )
            }, 15 * 60 * 1000) // 15 minutes
        }
    }

    return;
})
