import {useRuntimeConfig} from "#app";
import {withoutTrailingSlash} from "ufo";
import {useNAD} from "@directusLayer/modules/nad/runtime/composables/useNAD";
import { readFile } from "@directus/sdk";


export interface TypeOptionsThumbnail {
    fit?: string
    width?: number
    height?: number
    format?: string
    [key: string]: any
}

export const useNADFile = () => {
    const api: any = useNAD()
    const nadUrl = useNADUrl()


    const getFile = async (key: string, query: any = {}) => {
        return api.request(readFile(key, query))
    }

    const getThumbnail = (id: string, options: TypeOptionsThumbnail = {}) => {
        let urlImage = withoutTrailingSlash(nadUrl.asset_url) + `/${id}`

        urlImage += `?fit=${options.fit ?? 'contain'}`

        if (options.width) {
            urlImage += `&width=${options.width}`
        }

        if (options.height) {
            urlImage += `&height=${options.height}`
        }

        if (options.format) {
            urlImage += `&format=${options.format}`
        }

        return urlImage
    }

    return {
        getFile,
        getThumbnail
    }
}
