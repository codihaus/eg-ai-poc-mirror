import {COOKIE_TOKEN} from "@directusLayer/config";
import {get, set} from "lodash-es";
import {APIService, APIUserService} from "@directusLayer/server/api-service";
import {HEADER_SDK_USER, HEADER_SDK_USER_VALUE} from "@directusLayer/config";

export default defineEventHandler(async (event) => {
    const headers = getHeaders(event);
    const cookies = parseCookies(event);
    let userAccessToken: any = headers.authorization?.replace("Bearer ", "");

    if (!userAccessToken) {
        userAccessToken = get(cookies, COOKIE_TOKEN, null);
    }

    let client = await APIService.getInstance()
    if ((get(headers, HEADER_SDK_USER) === HEADER_SDK_USER_VALUE)) {
        client = APIUserService.getInstance(null)
        client.setToken(userAccessToken) //Make sure to set the token
    }

    set(event.context, 'api_client', client)

    // const sentry = event.context.$sentry
    // Need user info to set user context
    // if(sentry) {
    //     sentry.setUser({/*...*/})
    // }
})
