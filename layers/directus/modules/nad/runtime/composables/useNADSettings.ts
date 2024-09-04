import { useNAD } from "@directusLayer/modules/nad/runtime/composables/useNAD"
import * as sdk from "@directus/sdk"

export const useNADSettings = () => {
    const api: any = useNAD()
    const asyncHandle = useNADLoading()

    const readSettings = async (query: any = {}) => {
        return asyncHandle.process(async () => api.request(sdk.readSettings(query)))
    }

    return {
        readSettings,
        loading: computed(() => asyncHandle.loading)
    }
}
