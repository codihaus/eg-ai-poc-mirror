import { useNAD } from "@directusLayer/modules/nad/runtime/composables/useNAD"
import * as sdk from "@directus/sdk"
// import { readItem, readItems, readSingleton, deleteItem, createItem } from "@directus/sdk";

export const useNADItems = () => {
    const api: any = useNAD()
    const asyncHandle = useNADLoading()

    const getItems = async (collection: string, query: any = {}) => {
        return asyncHandle.process(async () => api.request(sdk.readItems(collection as never, query)))
    }

    const getItem = async (collection: string, key: any, query: any = {}) => {
        return asyncHandle.process(async () => api.request(sdk.readItem(collection as never, key, query)))
    }

    const getSingleton = async (collection: string, query: any = {}) => {
        return asyncHandle.process(async () => api.request(sdk.readSingleton(collection as never, query)))
    }

    const updateItem = async (collection: string, key: any, body: any, query: any = {}) => {
        return asyncHandle.process(async () => api.request(sdk.updateItem(collection as never, key, body as never, query)))
    }

    const deleteItem = async (collection: string, key: any) => {
        return asyncHandle.process(async () => api.request(sdk.deleteItem(collection as never, key)))
    }

    const createItem = async (collection: string, body: any, query: any = {}) => {
        return asyncHandle.process(async () => api.request(sdk.createItem(collection as never, body as never, query)))
    }

    return {
        getSingleton,
        getItems,
        getItem,
        updateItem,
        deleteItem,
        createItem,
        loading: computed(() => asyncHandle.loading)
    }
}
