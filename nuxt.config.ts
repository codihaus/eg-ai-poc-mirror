import { naiveui, proxy, layers, i18n } from './config'
import { withoutTrailingSlash } from 'ufo'

export default defineNuxtConfig({
    extends: [
        ...layers
    ],
    modules: [
        "nuxt-proxy-request",
        "@bg-dev/nuxt-naiveui",
        // "@nuxt/image",
        "@vueuse/nuxt",
        "@unocss/nuxt",
        "@nuxtjs/sitemap",
        "nuxt-icon",
        "@nuxtjs/i18n",
        ["@pinia/nuxt", { autoImports: ["defineStore"] }],
    ],
    image: {
        provider: "directus",
        directus: {
            baseURL: `${process.env.NUXT_PUBLIC_URL}/api/assets/`,
        },
        screens: {
            xs: 320,
            sm: 640,
            md: 768,
            lg: 1024,
            xl: 1280,
        },
    },
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
        // '/': {
        //     redirect: '/thread/+'
        // }
    },
    nitro: {
        prerender: {
            crawlLinks: false,
        },
        vercel: {
            functions: {
                maxDuration: 300
            }
        }
    },
    debug: true,
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
        app: {
            environment: process.env.NODE_ENV,
            directus: {
                auto_fetch_user: true,
                user_fields: [],
            },
        },
        public: {
            url: process.env.NUXT_PUBLIC_URL,
            cookie_prefix: process.env.NUXT_COOKIE_PREFIX,

            sentry: {
                dsn:  process.env.SENTRY_DSN ?? '',
                environment:  process.env.SENTRY_ENVIRONMENT ?? 'development',
                feedback_widget:  process.env.SENTRY_FEEDBACK_WIDGET ?? false,
            }
        },
    },
} as any);
