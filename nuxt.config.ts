import { naiveui, proxy, layers, i18n } from './config'
import { withoutTrailingSlash } from 'ufo'

export default defineNuxtConfig({
    extends: [
        ...layers
    ],
    modules: [
        "nuxt-proxy-request",
        "@vueuse/nuxt",
        "@unocss/nuxt",
        "@nuxtjs/sitemap",
        "nuxt-icon",
        "@nuxtjs/i18n",
        ["@pinia/nuxt", { autoImports: ["defineStore"] }],
    ],
    naiveui,
    proxy,
    i18n,
    site: {
        url: withoutTrailingSlash(process.env.NUXT_PUBLIC_URL),
    },
    devtools: {
        enabled: true,
        timeline: {
            enabled: true,
        },
    },
    typescript: {
        tsConfig: {
            exclude: ["../service-worker"],
        },
    },
    vite: {
        vue: {
            script: {
                defineModel: true,
                propsDestructure: true,
            },
        },
        server: {
            hmr: {
                protocol: "ws",
                clientPort: "3000",
            },
        },
    },
    css: [
        "@unocss/reset/tailwind.css",
        "~/styles/base.css",
        "~/styles/vars.css",
        "~/styles/scrollbars.css",
    ],
    app: {
        head: {
            viewport: "width=device-width,initial-scale=1",
            link: [
                { rel: "icon", href: "/favicon.ico", sizes: "any" },
                { rel: "icon", type: "image/svg+xml", href: "/nuxt.svg" },
                { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
            ],
            meta: [
                {
                    name: "viewport",
                    content:
                        "width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0",
                },
                {
                    name: "apple-mobile-web-app-status-bar-style",
                    content: "black-translucent",
                },
                {
                    name: "theme-color",
                    content: "#000",
                },
            ],
        },
    },
    experimental: {
        renderJsonPayloads: true,
        componentIslands: true,
    },

    routeRules: {
        "/manifest.webmanifest": {
            headers: {
                "Content-Type": "application/manifest+json",
                "Cache-Control": "public, max-age=0, must-revalidate",
            },
        },
        "/recaptcha/**": {
            swr: true,
        },
    },
    nitro: {
        prerender: {
            crawlLinks: false,
        },
    },
    debug: false,
    imports: {
        dirs: ["*/stores", "./app/common", "./app/composables/**"],
    },
    components: [
        {
            path: "~/app/components",
            global: true,
        },
    ],
    compatibilityDate: '2024-08-23',
    runtimeConfig: {
        log_level: parseInt(<string>process.env.NUXT_LOG_LEVEL) || "debug",
        sso: {
            providers: "google",
            redirect_urls: ""
        },
        app: {
            environment: process.env.NODE_ENV,
            captcha: {
                host: process.env.RECAPTCHA_HOST,
                site_key: process.env.RECAPTCHA_SITE,
                secret_key: process.env.RECAPTCHA_SECRET,
            },
            directus: {
                auto_fetch_user: true,
                user_fields: [],
            },
        },
        captcha: {
            host: process.env.RECAPTCHA_HOST,
            secret_key: process.env.RECAPTCHA_SECRET,
        },
        public: {
            url: process.env.NUXT_PUBLIC_URL,
            captcha_site_key: process.env.RECAPTCHA_SITE,
            cookie_prefix: process.env.NUXT_COOKIE_PREFIX,

            sentry: {
                dsn:  process.env.SENTRY_DSN ?? '',
                environment:  process.env.SENTRY_ENVIRONMENT ?? 'development',
                feedback_widget:  process.env.SENTRY_FEEDBACK_WIDGET ?? false,
            }
        },
    },
} as any);
