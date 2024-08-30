import { useParseData } from "./parse.utils";
import { consola } from "consola";

export const useGenerateUrl = (settings: any) => {
    const { getTransItemMulti, getPrefix } = useParseData();

    const routes = settings.routes || [];

    const languageDefault = getPrefix(
        settings.languages.filter((ite: any) => ite.default === true)[0].code
    );

    const generateLangSwitch = (
        name: any,
        languageCode: string,
        item?: any
    ) => {
        let output = [];

        if (item && item.translations && item.translations.length > 0) {
            output = item.translations.map((ite: any) => {
                const lang = getPrefix(ite.languages_code) ?? languageDefault;
                return {
                    lang_code: ite.languages_code,
                    lang,
                    // active: ite.languages_code.code === languages_code,
                    active: ite.languages_code === languageCode,
                    url: generateUrlByNameRoute(name, ite.languages_code, {
                        id: item.id,
                        slug: getTransItemMulti(
                            item,
                            ite.languages_code,
                            "slug"
                        ),
                    }),
                    slug: getTransItemMulti(item, ite.languages_code, "slug"),
                };
            });
        } else {
            output = settings.languages.map((ite: any) => {
                const lang = getPrefix(ite.code) ?? languageDefault;
                return {
                    lang_code: ite.code,
                    lang,
                    // active: ite.languages_code.code === languages_code,
                    active: ite.code === languageCode,
                    url: generateUrlByNameRoute(name, ite.code),
                    slug: true,
                };
            });
        }

        return output
            .filter(
                (item2: any) =>
                    item2.slug !== "null" && item2.slug !== null && item2.slug
            )
            .map((item2: any) => {
                return {
                    lang_code: item2.lang_code,
                    lang: item2.lang,
                    active: item2.active,
                    url: item2.url,
                };
            });
    };

    // const generateUrlByNameRoute = (name: string, languageCode: string, options?: any) => {
    //     try {
    //         if (name.endsWith('_test') && settings.isDev) {
    //             name = name.split('_test')[0]
    //         }
    //         let route = routes.find((item: any) => item.name === name)

    //         if (!route) throw new Error('Not find route !')

    //         if (route.alias && route.alias.length > 0) {
    //             let alias = route.alias.find((item: any) => item.split('/')[1] === getPrefix(languageCode))
    //             if (alias) return generateExpectedRoute(alias, options)
    //         }
    //         return generateExpectedRoute(route.path, options)
    //     } catch (e: any) {
    //         consola.error('ERR  generateUrlByNameRoute: ', e.message)
    //         consola.debug(e)
    //     }
    // }

    const generateUrlSearchFilter = (
        collection: string,
        languageCode: string,
        options?: any
    ) => {
        try {
            let params = new URLSearchParams(options).toString();

            return `/api/search/${collection}?lang=${languageCode}${
                options ? "&" + params : ""
            }`;
        } catch (e: any) {
            consola.error("ERR generateUrlFilter: ", e.message);
            consola.debug(e);
        }
    };

    const generateExpectedRoute = (routeRegex: any, params: any) => {
        let expectedRoute = routeRegex;

        for (const paramKey in params) {
            const paramValue = params[paramKey];
            const paramRegex = new RegExp(":" + paramKey + "\\b", "g");
            expectedRoute = expectedRoute.replace(paramRegex, paramValue);
        }

        const nonParamRegex = /\([^)]*\)|\[[^\]]*\]|[^-\w\d\/\-]/g;
        expectedRoute = expectedRoute.replace(nonParamRegex, "");

        return expectedRoute;
    };
    return {
        generateLangSwitch,
        generateUrlByNameRoute,
        generateUrlSearchFilter,
    };
};
