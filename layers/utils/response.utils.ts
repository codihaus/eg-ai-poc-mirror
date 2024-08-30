import { Logger } from '~/layers/utils/logger.util'
export const handleErrorsDirectus = (e: any, TypeError: any) => {
    const runtimeConfig = useRuntimeConfig()
    const logger = Logger(runtimeConfig.log_level)

    let error = e?.errors[0] || null
    let detail = error?.extensions?.code || "Something Incorrect"
    logger.debug({error})
    logger.error(detail)
    logger.debug(JSON.stringify(e, null, 2))

    throw createError({
        ...TypeError,
        data: error,
    })
}
