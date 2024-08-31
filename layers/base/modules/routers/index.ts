import {defineNuxtModule} from "@nuxt/kit";

export default defineNuxtModule({})

// import {createResolver, defineNuxtModule, extendPages, useNuxt} from "@nuxt/kit"
// import {layers} from './../../../../config';
// import {get} from "lodash-es";
// import {fileExists} from "../../../../layers/utils/file";
//
// export default defineNuxtModule({
//     setup() {
//         const resolver = createResolver(import.meta.url)
//         const rootPath = process.cwd();
//
//         extendPages(async (pages: any) => {
//             routes?.page?.forEach((route) => {
//                 route.file = parseRouteFile(route.file)
//                 let filePath = resolver.resolve(rootPath, `app/views/${route.file}`)
//
//                 if (fileExists(filePath)) {
//                     route.file = filePath
//                     pages.push(route)
//                 }
//             })
//
//             layers?.forEach((layer: string) => {
//                 const layerName = layer.replace('./layers/', '');
//
//                 const routerByLayer = get(routes, layerName, [])
//
//                 if (!routerByLayer.length) {
//                     return
//                 }
//
//                 routerByLayer.forEach((route: any) => {
//                     route.file = parseRouteFile(route.file)
//
//                     const layerFilePath = resolver.resolve(rootPath, `layers/${layerName}/views/${route.file.replace(`/${layerName}`, '')}`)
//                     const appFilePath = resolver.resolve(rootPath, `app/views/${route.file}`)
//
//                     route.file = fileExists(appFilePath)
//                         ? resolver.resolve(appFilePath)
//                         : resolver.resolve(layerFilePath);
//
//                     pages.push(route)
//                 })
//             });
//
//             return pages
//         })
//     },
// })
//
// function parseRouteFile(file: string) {
//     return !file.includes('.vue') ? `${file}/index.vue` : file
// }
