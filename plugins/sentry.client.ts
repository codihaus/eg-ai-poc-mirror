import * as Sentry from '@sentry/vue'

export default defineNuxtPlugin((nuxtApp) => {
    const router = useRouter()
    const {public: {sentry}} = useRuntimeConfig()

    if (!sentry.dsn) {
        console.warn('Sentry DSN not set, skipping Sentry Client initialization')
        return
    }

    const integrations = [
        Sentry.browserTracingIntegration({router}),
        Sentry.replayIntegration({
            maskAllText: false,
            blockAllMedia: false,
        })
    ]

    if (sentry.feedback_widget) {
        integrations.push(Sentry.feedbackIntegration({
            colorScheme: "system",
        }))
    }

    Sentry.init({
        app: nuxtApp.vueApp,
        dsn: sentry.dsn,
        environment: sentry.environment,
        integrations,

        tracesSampleRate: 0.2,
        replaysSessionSampleRate: 1.0,
        replaysOnErrorSampleRate: 1.0,
    })
})
