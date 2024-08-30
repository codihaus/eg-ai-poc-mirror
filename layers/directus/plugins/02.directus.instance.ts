import {COOKIE_REFRESH_TOKEN, COOKIE_TOKEN} from "@directusLayer/config";
import {withoutTrailingSlash} from "ufo";
import type {CookieRef} from "#app";
import {authentication, createDirectus, rest} from "@directus/sdk";
import {HEADER_SDK_USER, HEADER_SDK_USER_VALUE} from "~/config/constan";
import {set} from "lodash-es";


export default defineNuxtPlugin(async (nuxtApp) => {

    let {
        $adminClient,
        $userClient,
    }: any = useNuxtApp()

    if (!$adminClient) {
        const {
            public: {
                url: appUrl,
            }
        } = useRuntimeConfig();

        $adminClient = createDirectus(`${withoutTrailingSlash(appUrl)}/api`).with(rest({

        })).with(authentication());

        $userClient = createDirectus(`${withoutTrailingSlash(appUrl)}/api`).with(rest({
            onRequest(config) {
                if (!config.headers) config.headers = {};
                set(config.headers, HEADER_SDK_USER, HEADER_SDK_USER_VALUE)

                return config
            }
        })).with(authentication());

        $userClient.for = "User"
        $adminClient.for = "Admin"
    }

    nuxtApp.hook("page:loading:start", async () => {
        const cookieKey = useState("cookieKey", () => "")
        const cookieRefreshKey = useState("cookieRefreshKey", () => "")

        if (import.meta.server) {
            cookieKey.value = COOKIE_TOKEN
            cookieRefreshKey.value = COOKIE_REFRESH_TOKEN;
        }

        const userAccessCookie: CookieRef<string> = useCookie(cookieKey.value)
        $userClient.setToken(userAccessCookie.value)
    });


    return {
        provide: {
            adminClient: $adminClient,
            userClient: $userClient,
        }
    }
});
