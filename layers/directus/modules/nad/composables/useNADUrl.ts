import {useRuntimeConfig} from "#app";
import {withoutTrailingSlash} from "ufo";

export const useNADUrl = () => {
    const configRuntime = useRuntimeConfig()

    const api_url = withoutTrailingSlash(configRuntime.public?.API_URL ?? '/')
    const asset_url = withoutTrailingSlash(configRuntime.public?.ASSET_URL ?? '/')

    return {
        url: withoutTrailingSlash(api_url),
        asset_url
    }
}
