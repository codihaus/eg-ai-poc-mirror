import { inviteUser, acceptUserInvite } from "@directus/sdk"
import { useNADLoading } from "@directusLayer/modules/nad/runtime/composables/useNADLoading"
import { useNAD } from "@directusLayer/modules/nad/runtime/composables/useNAD"

interface TypeUserInvited {
    email: string
    role?: string
    first_name?: string
    last_name?: string
    phone_number?: string
    referral_id?: string
}


export const useNADUser = () => {
    const api: any = useNAD()

    const asyncHandle = useNADLoading()
    const userInvite = async (payload: TypeUserInvited) => {

        let { email, ...keys } = payload

        return asyncHandle.process(async () => api.request(
                () => ({
                    path: `/users/invite`,
                    method: 'POST',
                    body: JSON.stringify({
                        email,
                        ...(keys ?? {})
                    }),
                })
            )
        )
    }

    const userAcceptInvite = async (token: string, password: string) => {
        return asyncHandle.process(async () => api.request(acceptUserInvite(token, password)))
    }


    return {
        userInvite,
        userAcceptInvite,
        loading: computed(() => asyncHandle.loading)
    }
}
