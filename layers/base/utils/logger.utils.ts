import { createConsola } from 'consola'
export const Logger = (logLevel: number, options: any = {}) => {

    return createConsola({
        level: logLevel,
        ...options
    })
}
