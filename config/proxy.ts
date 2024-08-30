import { withoutTrailingSlash } from 'ufo'

export const proxy = {
    options: [
        {
            target: withoutTrailingSlash(process.env.NUXT_CMS_URL) ?? "",
            pathFilter: ["/cms/**"],
            pathRewrite: {
                "^/cms": "",
            },
            enableLogger: true,
        },
    ],
}
