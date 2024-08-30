import type { Sentry } from '@sentry/node'

interface ImportMeta {
    url: string;
    readonly hot?: import("./hot").ViteHotContext;
    readonly env: ImportMetaEnv;
    glob: import("./importGlob").ImportGlobFunction;
}


declare module 'h3' {
    interface H3EventContext {
        $sentry?: Sentry
    }
}
