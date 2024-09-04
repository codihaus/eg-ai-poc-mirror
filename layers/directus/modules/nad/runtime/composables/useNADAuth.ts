import * as sdk from "@directus/sdk"
import {useNAD} from "./useNAD";
import {useNADLoading} from "./useNADLoading";

export const useNADAuth = () => {
    const api: any = useNAD()

    const nuxtApp: any = useNuxtApp()
    const asyncHandle = useNADLoading()
    const currentUser = useState("currentUser")

    const login = async (email: string, password: string) => {
        return asyncHandle.process(async () => {
            const response = await api.request(sdk.login(email, password, { mode: "json" }))

            if (response?.user) {
                setUserLogin(response.user)
            }
            return response
        })
    }

    const setUserLogin = (user: any) => {
        currentUser.value = user
        nuxtApp.$auth.status = !!user.id
        nuxtApp.$auth.user = user ?? {}
    }

    const getMe = async (query: any) => {
        return asyncHandle.process(async () => api.request(sdk.readMe(query)))
    }

    const logout = async () => {
        return asyncHandle.process(async () => api.request(sdk.logout()).then(() => setUserLogin({})));
    }

    const refresh = async (mode: 'json' | 'cookie' | 'session', refreshToken: string) => {
        return asyncHandle.process(async () => api.request(sdk.refresh(mode, refreshToken)))
    }

    const resetPassword = async (token: string, password: string) => {
        return asyncHandle.process(async () => api.request(sdk.passwordReset(token, password)))
    }

    const requestPassword = async (email: string) => {
        return asyncHandle.process(async () => api.request(sdk.passwordRequest(email)))
    }


    return {
        login,
        logout,
        getMe,
        refresh,
        resetPassword,
        requestPassword,
        loading: computed(() => asyncHandle.loading)
    }
}
