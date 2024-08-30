import {COOKIE_TOKEN, COOKIE_REFRESH_TOKEN} from "@directusLayer/utils/directus.token";
import {Logger} from '~/layers/utils/logger.util'
import {handleErrorsDirectus} from '~/layers/utils/response.utils'

export default defineEventHandler(async (event) => {
    setCookie(event, COOKIE_TOKEN, login.access_token, {
        secure: true,
        sameSite: 'strict',
    });

    setCookie(event, COOKIE_REFRESH_TOKEN, "")
});
