import { useNAD } from "@directusLayer/modules/nad/runtime/composables/useNAD"
import * as sdk from "@directus/sdk"

export const useNADFields = () => {
    const api: any = useNAD()
    const asyncHandle = useNADLoading()

    const getFields = async (collection?: string) => {
        if (collection)
            return asyncHandle.process(async () => api.request(sdk.readFieldsByCollection(collection as never)))
        else
            return asyncHandle.process(async () => api.request(sdk.readFields()))
    }

    const getField = async (collection: string, field: string) => {
        return asyncHandle.process(async () => api.request(sdk.readField(collection, field)))
    }

    return {
        getFields,
        getField,
        loading: computed(() => asyncHandle.loading)
    }
}
