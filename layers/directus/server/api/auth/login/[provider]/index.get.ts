import { ErrorProviderIncorrectSSO, ErrorLoginSSO } from '~/layers/utils/http.status'
import { Logger } from '~/layers/utils/logger.util'
import { Url } from '~/layers/utils/url.utils'
import { handleErrorsDirectus } from '~/layers/utils/response.utils'


export default defineEventHandler(async (event) => {
    const runtimeConfig = useRuntimeConfig()
    const logger = Logger(runtimeConfig.log_level)
    const provider = getRouterParam(event, 'provider')
    const { fw }: any = getQuery(event)
    const { sso } = runtimeConfig

    if (!provider || !sso.providers.split(",").includes(provider)) {
        throw createError({
            ...ErrorProviderIncorrectSSO
        })
    }
    // AUTH_PROVIDERS
    // SSO_ALLOW_REDIRECT

    const redirect = `${runtimeConfig.app.cms.url}/sso/login/callback?fw=${fw || ""}`

    logger.debug({ redirect, provider })

    // logger.debug({ apiUser })

    let url = new Url(`${runtimeConfig.app.cms.url}/auth/login/${provider}`)
    url.setQuery('redirect', redirect)


    return sendRedirect(event, url.toString(), 302)
})


