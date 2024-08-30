export default [
    {
        name: "news",
        path: "/tin-tuc",
        file: "/news",
        alias: ["/en/news"],
    },
    {
        name: "news-detail",
        path: "/news/:slug",
        file: "/news/detail",
        alias: ["/en/news/:slug"],
    },
]