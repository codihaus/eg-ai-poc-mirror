export const useLinkSocial = () => {
    const href = shallowRef("");
    tryOnMounted(() => {
        href.value = window.location.href;
    });
    const Twitter = computed(
        () => `https://twitter.com/intent/tweet?text=${href.value}`
    );
    const Facebook = computed(
        () => `https://www.facebook.com/sharer/sharer.php?u=${href.value} `
    );
    const Linkedin = computed(
        () =>
            `https://www.linkedin.com/shareArticle?mini=true&url=${href.value}`
    );

    return {
        Twitter,
        Facebook,
        Linkedin,
    };
};

export function getLinkLoginSocial() {
    const URL_FRONTEND = useRuntimeConfig().public.url;
    const Facebook = (redirect?: string) => {
        return `/cms/auth/login/facebook?redirect=${redirect || URL_FRONTEND}`;
    };
    const Google = (redirect?: string) => {
        return `/cms/auth/login/google?redirect=${redirect || URL_FRONTEND}`;
    };

    return {
        Facebook,
        Google,
    };
}
