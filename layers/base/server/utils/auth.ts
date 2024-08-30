import { consola } from 'consola'

export default defineNuxtRouteMiddleware(async (to: any, from) => {
    const config = useRuntimeConfig().public
    let nuxtApp = useNuxtApp()
    const { fetchUser } = useDirectusAuth()
    const { refreshTokens } = useDirectusToken()

    const checkUser = async () => {
        await fetchUser()
        const userRefresh = useDirectusUser()
        return !!userRefresh.value
    }

    try {
        let cookie: any = nuxtApp._cookies

        let cookieNameToken = config.directus?.cookieNameToken
        let cookieNameRefreshToken = config.directus?.cookieNameRefreshToken

        if (!cookieNameToken || !cookieNameRefreshToken) throw new Error('Not cookie directus')

        if (cookie.hasOwnProperty(cookieNameRefreshToken)) {
            if (!cookie.hasOwnProperty(cookieNameToken)) {
                await refreshTokens()
                consola.info('Refresh auth !')
            }

            await fetchUser()
            const userRefresh = useDirectusUser()

            if (!userRefresh.value) throw new Error('Error token in cookie')

            consola.info('Authentication  ...')
        }
    } catch (e: any) {
        consola.warn('Not auth ... ', e.message)
        consola.debug(e)
    }
})
