import { readField } from "@directus/sdk"
import { ErrorReadField } from "~/layers/utils/http.status"
import { Logger } from '~/layers/utils/logger.util'
import { handleErrorsDirectus } from '~/layers/utils/response.utils'

export default defineEventHandler(async (event) => {
    const runtimeConfig = useRuntimeConfig()
    const logger = Logger(runtimeConfig.log_level)
    const collection = getRouterParam(event, 'collection')
    const field = getRouterParam(event, 'field')

    const apiUser = event.context.api_client


    return apiUser.request(readField(collection as string, field as string)).catch((e: any) => {
        logger.error(`Error: readField`)
        return handleErrorsDirectus(e, ErrorReadField)
    })
});

