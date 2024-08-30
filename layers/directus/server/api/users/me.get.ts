import {ErrorReadMeFailed} from '~/layers/utils/http.status'
import {readMe} from "@directus/sdk"
import {handleErrorsDirectus} from '~/layers/utils/response.utils'
import { Logger } from '~/layers/utils/logger.util'

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const apiUser = event.context.api_client
    return apiUser.request(readMe(query as never)).catch((e: any) => handleErrorsDirectus(e, ErrorReadMeFailed))
});
