export const useCaptcha = () => {
    const config = useRuntimeConfig();
    const loaded = ref(false);
    const token = ref("");

    tryOnMounted(async () => {
        const script = document.createElement("script");
        script.src = `https://www.google.com/recaptcha/api.js?render=${config.public.captcha_site_key}`;
        script.async = true;
        script.defer = true;
        script.classList.add("grecaptcha-custom");
        script.onload = () => {
            loaded.value = true;
        };
        document.head.appendChild(script);
    });

    tryOnUnmounted(() => {
        document.querySelector(".grecaptcha-custom")?.remove();
        document.querySelector(".grecaptcha-badge")?.remove();
    });

    const getToken = () => {
        if (!loaded) return;
        return new Promise(() => {
            // @ts-expect-error
            grecaptcha.ready(function () {
                // @ts-expect-error
                grecaptcha
                    .execute(config.public.captcha_site_key, {
                        action: "submit",
                    })
                    .then(function (code: string) {
                        token.value = code;
                    });
            });
        });
    };

    return { token: readonly(token), getToken };
};
