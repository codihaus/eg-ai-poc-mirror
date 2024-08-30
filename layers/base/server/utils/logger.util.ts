import { createConsola } from 'consola'

export const logger = (level: any) => createConsola({
    level,
    fancy: true
})