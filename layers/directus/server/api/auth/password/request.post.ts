import { ErrorPasswordRequest } from '~/layers/utils/http.status'
import { Logger } from '~/layers/utils/logger.util'
import { handleErrorsDirectus } from '~/layers/utils/response.utils'
import { passwordRequest } from "@directus/sdk"

export default defineEventHandler(async (event) => {
    const runtimeConfig = useRuntimeConfig()
    const logger = Logger(runtimeConfig.log_level)
    const { email } = await readBody(event)

    // logger.debug({ body })

    const apiUser = event.context.api_client

    let reset_url = `${runtimeConfig.public.url}/reset-password`

    return apiUser.request(passwordRequest(email, reset_url))
        .catch((e: any) => handleErrorsDirectus(e, ErrorPasswordRequest))
});


