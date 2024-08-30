import { ErrorUserInvited } from '~/layers/utils/http.status'
import { Logger } from '~/layers/utils/logger.util'
import { createUser, inviteUser } from "@directus/sdk"
import { handleErrorsDirectus } from '~/layers/utils/response.utils'

export default defineEventHandler(async (event) => {
    const runtimeConfig = useRuntimeConfig()
    const logger = Logger(runtimeConfig.log_level)

    const { email, role, ...keys } = await readBody(event)

    const apiUser = event.context.api_client


    let roleId = role ?? runtimeConfig.public.role_default

    let invite_url = runtimeConfig.public.url + "/invite/accept"

    // logger.debug({ email, roleId, invite_url })

    // return apiUser.request(inviteUser(email, roleId, invite_url))
    //     .catch((e: any) => {
    //         logger.debug(e)
    //         throw createError({
    //             ...ErrorUserInvited,
    //             data: e?.errors
    //         })
    //     })

    return apiUser.request(createUser({
        email,
        role: roleId,
        status: 'invited',
        ...keys
    })).catch(async (e: any) => {
        let error = e.errors[0]
        if (error?.extensions?.code === "RECORD_NOT_UNIQUE" && error?.extensions?.field === 'email') {
            return apiUser.request(inviteUser(email, roleId, invite_url))
        }

        return handleErrorsDirectus(e, ErrorUserInvited)
    })



});


