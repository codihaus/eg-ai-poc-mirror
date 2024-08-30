export default [
    {
        name: "home",
        path: "/",
        file: "/home",
        alias: ["/en"],
    },
    {
        name: "static",
        path: "/trang/:slug",
        file: "/static",
        alias: ["/en/page/:slug"],
    }
]
