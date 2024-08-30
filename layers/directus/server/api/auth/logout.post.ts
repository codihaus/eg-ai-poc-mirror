import {COOKIE_TOKEN, COOKIE_REFRESH_TOKEN} from "@directusLayer/utils/directus.token";
import { Logger } from '~/layers/utils/logger.util'
import { handleErrorsDirectus } from '~/layers/utils/response.utils'

export default defineEventHandler(async (event) => {
    setCookie(
        event,
        COOKIE_TOKEN,
        "",
        {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 0,
        });

    setResponseStatus(event, 201)
});
