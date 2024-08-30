import slugify from 'slugify'
import { generateDateField, generateTimeField } from './time.utils';

export const useParseData = () => {
    const CMS_URL = useDirectusUrl();
    const REQUEST_URL = useRequestURL();
    const {getThumbnail} = useDirectusFiles();
    const getPrefix = (languages_code: string) => {
        return languages_code.split("-")[0];
    };

    const getTransItemMulti = (item: any, languageCode: string, prop: string) => {
        if (item.translations && item.translations.find((ite: any) => ite.languages_code === languageCode)) {
            const data = item.translations.find((ite: any) => ite.languages_code === languageCode);
            if (data[prop])
                return replaceFileUrl(data[prop])
                // return data[prop]

            else
                return null;
        } else {
            return null;
        }
    }

    const getTransImage = (item: any, languageCode:string, prop: string) => {
        if (item.translations && item.translations.find((ite: any) => ite.languages_code === languageCode)) {
            const data = item.translations.find((ite: any) => ite.languages_code === languageCode);
            if (data[prop]) {
                return generateImageLink({ id: data[prop] });
            }
            else
                return null;
        } else {
            return null;
        }
    }

    const getTransMultiImage = (item: any, languageCode:string, prop: string) => {
        if (item.translations && item.translations.find((ite: any) => ite.languages_code === languageCode)) {
            const data = item.translations.find((ite: any) => ite.languages_code === languageCode);
            if (data[prop] && data[prop][0]) {
                return data[prop].map((ite: any) => generateImageLink({ id: ite.directus_files_id }));
            }
            else
                return null;
        } else {
            return null;
        }
    }


    const calTotalPage = (total_result: any, limit: any) => {
 
        if (total_result) {
            if (parseInt(total_result) % limit === 0) {

                return parseInt(total_result) / limit;
            } else
            {
                return Math.floor(parseInt(total_result) / limit) + 1;
            }
        } else
            return 0;
    };
    const calTotalPageJSON = (result: any, limit: any) => result && result.length > 0 ? calTotalPage(result[0].count.id, limit) : 0;
    const calTotalResultJSON = (result: any) => result && result.length > 0 ? result[0].count.id : 0;
    const generateDefaultFieldDirectus = (item: any) => {
        const output = {
            ...item,
            id: item.id ?? null,
            sort: item.sort ?? null,
            status: item.status ?? null
        };
        if (item.date_created) {
            // output["date_created_value"] = item.date_created;
            output["date_created"] = generateDateField(item.date_created);
            output["time_created"] = generateTimeField(item.date_created)

        }
        if (item.date_updated) {
            // output["date_updated_value"] = item.date_updated;
            output["date_updated"] = generateDateField(item.date_updated)
            // output["time_created"] = generateTimeField(item.date_updated)

        }
        if (item.user_created && typeof item.user_created === "object" && item.user_created.first_name && item.user_created.last_name) {
            output["user_created"] = item.user_created.first_name + " " + item.user_created.last_name;
        }
        if (item.user_updated && typeof item.user_updated === "object" && item.user_updated.first_name && item.user_updated.last_name) {
            output["user_updated"] = item.user_updated.first_name + " " + item.user_updated.last_name;
        }
        return output;
    };

    const getImageField = (item: any, name: string) => {

        if (item && item[name]) {
            return generateImageLink({ id: item[name] });
        }
        return null;
    }

    const replaceFileUrl = (content: any) => {

        const regex = new RegExp(CMS_URL + "assets", "g");
        if (regex.test(content)) return content.replace(regex, `${REQUEST_URL.origin}/cms/assets`);
        return content;
    }


    const parseSlug = (text: string) => {
        return slugify(text, {
            replacement: "-",  // replace spaces with replacement character, defaults to `-`
            remove: undefined, // remove characters that match regex, defaults to `undefined`
            lower: true,      // convert to lower case, defaults to `false`
            strict: false,     // strip special characters except replacement, defaults to `false`
            locale: "vi",       // language code of the locale to use
            trim: true         // trim leading and trailing replacement chars, defaults to `true`
        });
    };

    const generateImageLink = (params: any) => {
        if (!params || !params.id) return null
            return getThumbnail(`${params.id}/${parseSlug(params.title ?? '')}`);
        // return params.title ? `${REQUEST_URL.origin}/cms/assets/${params.id}/${parseSlug(params.title)}` : `${REQUEST_URL.origin}/cms/assets/${params.id}`
        // return params.title ? `http://localhost:3000/cms/assets/${params.id}/${parseSlug(params.title)}` : `http://localhost:3000/cms/assets/${params.id}`
    }

    const fieldsDefault = ["id","status","date_created","date_updated"]

    return {
        getTransItemMulti,
        getPrefix,
        getTransImage,
        generateDefaultFieldDirectus,
        calTotalPage,
        getImageField,
        fieldsDefault,
        getTransMultiImage,
        generateImageLink
    };
};
