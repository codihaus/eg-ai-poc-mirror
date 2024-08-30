// import { config } from "../../config";
import type { TypeDirectusEntity } from "../types/directus.type";
// import { generateDateField } from "./time.utils";
// let slugify = require("slugify");
// const { convert } = require("html-to-text");

// export const getTransItem = (item, prop) => (item.translations && item.translations.length > 0 && item.translations[0][prop]) ? replaceFileUrl(item.translations[0][prop]) : null;
// export const getTransImage = (item, prop) => (item.translations && item.translations.length > 0 && item.translations[0][prop]) ? item.translations[0][prop].id : null;

export const getTransItemMulti = (item: any, lang: any, prop: any) => {
    if (
        item.translations &&
        item.translations.find((ite: any) => ite.languages_code === lang)
    ) {
        let data = item.translations.find(
            (ite: any) => ite.languages_code === lang
        );
        if (data[prop]) return replaceFileUrl(data[prop]);
        else return null;
    } else {
        return null;
    }
};
// export const getTransImageMulti = (item, lang, prop) => {
//     if (item.translations && item.translations.find(ite => ite.languages_code.code === lang)) {
//         let data = item.translations.find(ite => ite.languages_code.code === lang)
//         if (data[prop]) return data[prop].id
//         else return null
//     } else {
//         return null
//     }
// }

// export const getTransImage = (item, lang, prop) => {
//     if (item.translations && item.translations.find(ite => ite.languages_code.code === lang)) {
//         let data = item.translations.find(ite => ite.languages_code.code === lang)
//         if (data[prop] === null) return null;
//         if (data[prop][0]) {

//             return data[prop].map((item: any) => {
//                 return createLinkImage({
//                     id: item.directus_files_id,
//                 });
//             })

//         }
//         else if (typeof data[prop] === "object") {
//             return createLinkImage({
//                 id: data[prop].id,
//             });
//         }
//         else return null
//     } else {
//         return null
//     }
// }

// export const getImagesFields = (item: any, prop: any) => {
//     if (item && item[prop]) {
//         return item[prop].map((image: any) => {
//             return createLinkImage({
//                 id: image.directus_files_id,
//             });
//         })
//     }
//     return [];
// }

// export const getImageField = (item, prop) => (item && item[prop]) ? { id: item[prop].id, title: item[prop].title } : false;

const replaceFileUrl = (content: any) => {
    let regex = new RegExp("" + "assets", "g");

    if (regex.test(content)) return content.replace(regex, "/files/assets");
    else return content;
};

export const calTotalPage = (total_result: any, limit: any) => {
    if (total_result) {
        if (parseInt(total_result) % limit === 0) {
            //return parseInt(total_result) / this.limit;
            return parseInt(total_result) / limit;
        } else return Math.floor(parseInt(total_result) / limit) + 1;
    } else return 0;
};

export const calTotalPageJSON = (result: any, limit: any) =>
    result && result.length > 0 ? calTotalPage(result[0].count.id, limit) : 0;

export const calTotalResultJSON = (result: any) =>
    result && result.length > 0 ? result[0].count.id : 0;

// export const parseSlug = (text: any) => {
//     return slugify(text, {
//         replacement: "-",  // replace spaces with replacement character, defaults to `-`
//         remove: undefined, // remove characters that match regex, defaults to `undefined`
//         lower: true,      // convert to lower case, defaults to `false`
//         strict: false,     // strip special characters except replacement, defaults to `false`
//         locale: "vi",       // language code of the locale to use
//         trim: true         // trim leading and trailing replacement chars, defaults to `true`
//     });
// };
// export const convertContent = (content) => {

//     return convert(content ?? "", {
//         limits: {
//             maxBaseElements: 150,
//             maxChildNodes: 5,
//             maxDepth: 200
//         },
//         ignoreHref: true,
//         ignoreImage: true,
//         linkBrackets: false,
//         preserveNewlines: true,
//         selectors: [
//             { selector: 'img', format: 'skip' },
//             { selector: 'a.button', format: 'skip' },
//             { selector: 'a', options: { hideLinkHrefIfSameAsText: true } },
//             { selector: 'a', options: { ignoreHref: true } },
//             { selector: 'a', options: { noAnchorUrl: true } },
//             { selector: 'a', options: { linkBrackets: false } },
//         ]
//     })
// }

export const generateDefaultFieldDirectus = (item: TypeDirectusEntity) => {
    let output: any = {
        ...item,
        id: item.id ?? null,
        sort: item.sort ?? null,
        status: item.status ?? null,
    };

    if (item.date_created) {
        output["date_created_value"] = item.date_created;
        // output["date_created"] = generateDateField(item.date_created)
        output["date_created"] = item.date_created;
    }

    if (item.date_updated) {
        output["date_updated_value"] = item.date_updated;
        // output["date_updated"] = generateDateField(item.date_updated)
        output["date_updated"] = item.date_updated;
    }

    if (
        item.user_created &&
        typeof item.user_created === "object" &&
        item.user_created.first_name &&
        item.user_created.last_name
    ) {
        output["user_created"] =
            item.user_created.first_name + " " + item.user_created.last_name;
    }

    if (
        item.user_updated &&
        typeof item.user_updated === "object" &&
        item.user_updated.first_name &&
        item.user_updated.last_name
    ) {
        output["user_updated"] =
            item.user_updated.first_name + " " + item.user_updated.last_name;
    }

    return output;
};

// export const generateItemSeoDetail = (item) =>{
// 	let output = {
// 		...item,
// 		id: item.id ?? null,
// 		collection: item.collection ?? null,
// 		id_record: item.id_record ?? null,
// 		schema_code: item.schema_code  ||  getTransItem(item,"schema_code"),
// 		meta_title: getTransItem(item,"meta_title"),
// 		meta_description: getTransItem(item,"meta_description"),
// 		meta_keywords: getTransItem(item,"meta_keywords"),
// 		robots: getTransItem(item,"robots"),
// 		header_code: getTransItem(item,"header_code"),
// 		footer_code: getTransItem(item,"footer_code"),
// 		image_share: getTransImage(item, "image_share") ? createLinkImage(getTransImage(item, "image_share")) : null
// 	}
//
// 	return output
// }

// export const generateItemSeoDetailRe = (item, languages_code: string) => {
//     let output = {
//         ...item,
//         id: item.id ?? null,
//         collection: item.collection ?? null,
//         id_record: item.id_record ?? null,
//         schema_code: item.schema_code || getTransItemMulti(item, languages_code, "schema_code"),
//         meta_title: getTransItemMulti(item, languages_code, "meta_title"),
//         meta_description: getTransItemMulti(item, languages_code, "meta_description"),
//         meta_keywords: getTransItemMulti(item, languages_code, "meta_keywords"),
//         robots: getTransItemMulti(item, languages_code, "robots"),
//         header_code: getTransItemMulti(item, languages_code, "header_code"),
//         footer_code: getTransItemMulti(item, languages_code, "footer_code"),
//         image_share: getTransImageMulti(item, languages_code, "image_share") ? createLinkImage(getTransImageMulti(item, languages_code, "image_share")) : null
//     }

//     return output
// }

// export const createLinkImage = (params:any) => {
//     if (!params || !params.id) return null
//     return params.title ? `${config.proxy.files}/${params.id}/${parseSlug(params.title)}` : `${config.proxy.files}/${params.id}`
// }
