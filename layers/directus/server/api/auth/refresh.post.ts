import { ErrorReadMeFailed } from '~/layers/utils/http.status'
import { Logger } from '~/layers/utils/logger.util'
import { COOKIE_TOKEN, COOKIE_REFRESH_TOKEN } from "@directusLayer/utils/directus.token"
import { refresh } from "@directus/sdk"
import { get } from "lodash-es"
import { handleErrorsDirectus } from '~/layers/utils/response.utils'

export default defineEventHandler(async (event) => {
    const runtimeConfig = useRuntimeConfig()
    const logger = Logger(runtimeConfig.log_level)
    const body = await readBody(event)

    logger.debug({ body })

    const apiUser = event.context.api_client

    const { access_token, expires, refresh_token } = await apiUser.request(refresh(body?.mode, body?.refresh_token))
        .catch((e: any) => handleErrorsDirectus(e, ErrorReadMeFailed))

    logger.info({ access_token, expires, refresh_token })


    // logger.debug({ login, runtimeConfig })
    setCookie(event, COOKIE_TOKEN, access_token, {
        secure: true,
        sameSite: 'strict',
        maxAge: expires,
    })

    setCookie(event, COOKIE_REFRESH_TOKEN, refresh_token)

    setResponseStatus(event, 202)

    return {
        access_token,
        expires,
        refresh_token
    }
})


