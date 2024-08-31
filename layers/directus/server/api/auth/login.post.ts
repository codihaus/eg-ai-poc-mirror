import { ErrorReadMeFailed } from '~/layers/utils/http.status'
import { Logger } from '~/layers/utils/logger.util'
import { APIUserService } from "@directusLayer/server/api-service"
import { COOKIE_TOKEN, COOKIE_REFRESH_TOKEN } from "@directusLayer/utils/directus.token"
import {readMe} from "@directus/sdk";
import { ErrorLoginFailed } from "~/layers/utils/http.status"
import { get } from "lodash-es"
import { handleErrorsDirectus } from '~/layers/utils/response.utils'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const client = get(event.context, 'api_client');

    const login = await client
        .login(body.email, body.password, { mode: 'json' })
        .catch((e: any) => handleErrorsDirectus(e, ErrorLoginFailed));

    setCookie(event, COOKIE_TOKEN, login.access_token, {
        secure: true,
        sameSite: 'strict',
        maxAge: login.expires,
    });

    setCookie(event, COOKIE_REFRESH_TOKEN, login?.refresh_token || "")

    const apiUser = APIUserService.getInstance(null, login.access_token);
    let userModel = await apiUser.request(
        readMe({
            fields: ["*"]
        })
    ).catch((e: any) => handleErrorsDirectus(e, ErrorReadMeFailed));


    setResponseStatus(event, 202)

    return {
        data: {
            ...login,
            user: userModel
        }
    }
});


