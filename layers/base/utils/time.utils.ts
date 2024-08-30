const DATE_FORMAT = 'DD/MM/YYYY'
const TIME_FORMAT = 'h:mm A'

import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
// const dayjs = require("dayjs");
// let customParseFormat = require('dayjs/plugin/customParseFormat')

export const convertUnixTimeStampToDateTime = (unix_timestamp: any) => {
    // ex: 1661705999 => Date
    return new Date(+unix_timestamp * 1000)
}

export const parseDateToTimestamp = (date: string) => {
    // ex: 20/04/2022 => timestamp
}

export const generateTimeField = (date: any) => {
    return date ? dayjs(date).format(TIME_FORMAT) : ''
}

export const generateDateField = (date: any) => {
    return date ? dayjs(date).format(DATE_FORMAT) : ''
}

// export const convertFormat = (value = '', from = 'DD/MM/YYYY', to = 'YYYY-MM-DD') => {
//     let day = dayjs.extend(customParseFormat)
//     let d = day(value, from)
//     return d.isValid() ? d.format(to) : ''
// }
