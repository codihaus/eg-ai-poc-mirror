import {withoutTrailingSlash} from "ufo";
import {rest, authentication, createDirectus, graphql} from "@directus/sdk";
import {BACKEND_TOKEN, BACKEND_URL, COOKIE_TOKEN} from "@directusLayer/config";

export class APIService {
    private static instance: any;
    private static url = BACKEND_URL;
    private static token = BACKEND_TOKEN;

    public static async getInstance() {
        if (!APIService.instance) {
            APIService.instance = createDirectus(
                withoutTrailingSlash(APIService.url)
            );
            APIService.instance = APIService.instance.with(authentication());
            APIService.instance = APIService.instance.with(rest());
            APIService.instance = APIService.instance.with(graphql());

        }

        APIService.instance.setToken(APIService.token);
        return APIService.instance;
    }
}

export class APIUserService {
    private static url = BACKEND_URL;

    public static getInstance(event: any, token: string | null = null) {
        let instance = createDirectus(
            withoutTrailingSlash(APIUserService.url)
        );
        instance = instance.with(authentication());
        instance = instance.with(rest());
        instance = instance.with(graphql());

        if (!token && event) {
            const cookies = parseCookies(event);
            token = cookies[COOKIE_TOKEN];
        }

        instance.setToken(token);
        return instance
    }
}
