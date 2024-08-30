export default defineAppConfig({
    directusLayer: {
        name: 'Hello from Directus layer'
    }
})

declare module '@nuxt/schema' {
    interface AppConfigInput {
        directusLayer?: {
            /** Project name */
            name?: string
        }
    }
}
