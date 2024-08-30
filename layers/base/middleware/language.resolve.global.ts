import { allowedLanguages, defaultLang } from '~/config'

export default defineNuxtRouteMiddleware((to: any, from: any) => {

    const configStore = useConfigStore();
    if (!to.params.lang) {
        to.params.lang = defaultLang;
        const parse = to.path.split("/");
        const enPrefix = parse[1] ?? "";
        if (allowedLanguages.indexOf(enPrefix) >= 0) {
            to.params.lang = enPrefix;
        }
    }
    configStore.setCurrentLanguage(to.params.lang);

    const nuxtApp = useNuxtApp();

});
