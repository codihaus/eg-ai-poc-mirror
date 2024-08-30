import path from "path"

export default defineNuxtConfig({
    imports: {
        dirs: [
            "./plugins",
            './components/**'
        ],
    },
    components: [
        {
            path: "./components",
            global: true,
        },
    ],

    alias: {
        "@directusLayer": path.resolve(__dirname),
    }
})
