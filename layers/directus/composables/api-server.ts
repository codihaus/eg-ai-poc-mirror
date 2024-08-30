import { withoutTrailingSlash } from "ufo";
import { rest, createDirectus, authentication} from "@directus/sdk";
import {useRuntimeConfig} from "#app";

export class APIServer {
    private static instance: any;

    public static getInstance(opts: {} = {}) {
        if (!APIServer.instance) {
            const runtimeConfig = useRuntimeConfig();
            const baseUrl = withoutTrailingSlash(runtimeConfig.public?.url ?? '/')

            APIServer.instance = createDirectus(
                withoutTrailingSlash(`${baseUrl}/api`)
            );

            APIServer.instance = APIServer.instance.with(rest(
                opts
            ));
            APIServer.instance = APIServer.instance.with(authentication());
        }

        return APIServer.instance;
    }
}

export const useAPI = async (callback: Function) => {
    const client = await APIServer.getInstance();
    return await client.request(
        callback()
    )
}
