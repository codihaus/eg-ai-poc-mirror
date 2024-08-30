import { readSettings } from "@directus/sdk"
import { ErrorReadSettings } from "~/layers/utils/http.status"
import { Logger } from '~/layers/utils/logger.util'
import { handleErrorsDirectus } from '~/layers/utils/response.utils'
import { APIService } from "../../api-service"

export default defineEventHandler(async (event) => {
    const runtimeConfig = useRuntimeConfig()
    const logger = Logger(runtimeConfig.log_level)
    // const apiUser = event.context.api_client
    const api = await APIService.getInstance()
    const query = getQuery(event)

    return api.request(readSettings(query as never)).catch((e: any) => {
        logger.error(`Error: readSettings`)
        return handleErrorsDirectus(e, ErrorReadSettings)
    })
});

