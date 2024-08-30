import {withoutTrailingSlash} from "ufo";

export const HEADER_SDK_USER = 'authenticate-require'
export const HEADER_SDK_USER_VALUE = 'yes'

export const COOKIE_TOKEN = `${process.env.NUXT_COOKIE_PREFIX}_token`
export const COOKIE_REFRESH_TOKEN = `${process.env.NUXT_COOKIE_PREFIX}_rf`

export const BACKEND_URL = withoutTrailingSlash(process.env.NUXT_CMS_URL ?? '')
export const BACKEND_TOKEN = process.env.NUXT_CMS_TOKEN ?? "" // Chỉ có giá trị khi ở server side

export const API_URL = withoutTrailingSlash(process.env.NUXT_CMS_URL ?? '/api')  // Khi ở client side thì sẽ có giá trị '/api'

