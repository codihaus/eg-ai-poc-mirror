
//https://platform.openai.com/docs/api-reference/messages/listMessages

import { readItems } from "@directus/sdk";
import { ErrorReadItems, ErrorReadMeFailed } from "~/layers/utils/http.status";
import { handleErrorsDirectus } from "~/layers/utils/response.utils";

export default defineEventHandler(async (event) => {
    // const query = getQuery(event);

    const query = event.context.query_parsed

    const apiUser = event.context.api_client
    return apiUser.request(readItems(query as never)).catch((e: any) => handleErrorsDirectus(e, ErrorReadItems))
})
