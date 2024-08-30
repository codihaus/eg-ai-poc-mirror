import { readFields } from "@directus/sdk"
import { ErrorReadAllFields } from "~/layers/utils/http.status"
import { Logger } from '~/layers/utils/logger.util'
import { handleErrorsDirectus } from '~/layers/utils/response.utils'

export default defineEventHandler(async (event) => {
    const runtimeConfig = useRuntimeConfig()
    const logger = Logger(runtimeConfig.log_level)
    const apiUser = event.context.api_client


    return apiUser.request(readFields()).catch((e: any) => {
        logger.error(`Error: readAllFields`)
        return handleErrorsDirectus(e, ErrorReadAllFields)
    })
});

