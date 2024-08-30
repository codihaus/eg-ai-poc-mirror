import * as Sentry from '@sentry/node'
import { nodeProfilingIntegration } from '@sentry/profiling-node'
import { H3Error } from 'h3'

export default defineNitroPlugin((nitroApp) => {
    const { public: { sentry } } = useRuntimeConfig()

    if (!sentry.dsn) {
        console.warn('Sentry DSN not set, skipping Sentry initialization')
        return
    }
    globalThis._sentryEsmLoaderHookRegistered = true
    Sentry.init({
        dsn: sentry.dsn,
        environment: sentry.environment,
        integrations: [nodeProfilingIntegration()],
        tracesSampleRate: 1.0,
        profilesSampleRate: 1.0
    })

    nitroApp.hooks.hook('error', (error) => {
        if (error instanceof H3Error) {
            if (error.statusCode === 404 || error.statusCode === 422) {
                return
            }
        }
        Sentry.captureException(error)
    })

    nitroApp.hooks.hook('request', (event) => {
        event.context.$sentry = Sentry
    })

    nitroApp.hooks.hookOnce('close', async () => {
        await Sentry.close(2000)
    })

    nitroApp.hooks.hook('request', (event) => {
        event.context.$sentry = Sentry
    })
})
