import * as Sentry from '@sentry/vue'

interface sentryEvent {
    message?: string
    level?: string
    extra?: {
        section?: string
        action?: string
        description?: string
    }
    user?: {
        id?: string
        email?: string
    }
}

export const useSentry = () => {
    const logMessage = (message: string) => {
        Sentry.captureMessage(message)
    }

    const logException = (exception: any) => {
        Sentry.captureException(exception)
    }

    const logEvent = (event: sentryEvent) => {
        Sentry.captureEvent(event as any)
    }

    const showReportDialog = (eventID: string) => {
        Sentry.showReportDialog({
            eventId: eventID
        });
    }

    return {
        logMessage,
        logException,
        logEvent,
        showReportDialog
    }
}
