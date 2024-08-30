import pino from "pino";

export const Logger = () => {
    const runtimeConfig = useRuntimeConfig()
    let __logLevel: any = runtimeConfig.log_level || 'info'
    if (typeof logLevel === 'number') {
        __logLevel = {
            1: 'trace',
            2: 'debug',
            3: 'info',
            4: 'debug',
        }[logLevel] || 'info'
    }

    return pino({
        formatters: {
            level: (label) => {
                return {
                    level: __logLevel,
                }
            }
        },
        level: __logLevel,
        redact: {
            paths: [],
            remove: false
        },
        transport: {
            target: 'pino-pretty',
            options: {
                colorize: true,
                ignore: 'pid,hostname',
                messageFormat: false,
                translateTime: "yyyy-mm-dd HH:MM:ss.l",
            }
        }
    })
}
