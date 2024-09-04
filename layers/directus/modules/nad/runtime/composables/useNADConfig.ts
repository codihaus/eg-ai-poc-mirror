import {useRuntimeConfig} from "#app";

export const useNADConfig = () => {
    const configRuntime = useRuntimeConfig()
    const prefixCookie = configRuntime.public?.cookie_prefix ?? 'cdh'
    return {
        cookieMaxAge: 60 * 60 * 24 * 30,
        cookieSameSite: "Strict",
        cookieSecure: true,
        cookieNameToken: `${prefixCookie}_token`,
        cookieNameRefreshToken: `${prefixCookie}_rf`,
        cookieNameExpires: `${prefixCookie}_exp`
    }
}
