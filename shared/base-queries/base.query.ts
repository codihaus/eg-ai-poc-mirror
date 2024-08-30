
export type typeQueryOptions = {
    page?: number,
    limit?: number,
    sort?: Array<string>,
    filter?: any,
    meta?: Array<string>
}

export const getTranslationField = (options) => {
    return {
        languages_code: {
            code: true
        },
        ...options
    }
}


export const getTranslateQuery = (lang, options) => {
    return {
        __args: {
            filter: {
                languages_code: {
                    code: {
                        _eq: lang
                    }
                }
            }
        },
        ...options
    }
}

export const querySeoDetail = (lang) => {
    return {
        id: true,
        collection: true,
        id_record: true,
        //schema_code: true,
        translations: getTranslateQuery(lang, {
            meta_title: true,
            meta_description: true,
            meta_keywords: true,
            schema_code: true,
            robots: true,
            header_code: true,
            footer_code: true,
            image_share: {
                id: true,
                title: true
            }
        })
    }
}

export const querySeoDetailRe = () => {
    return {
        id: true,
        collection: true,
        id_record: true,
        //schema_code: true,
        translations: {
            meta_title: true,
            meta_description: true,
            meta_keywords: true,
            schema_code: true,
            robots: true,
            header_code: true,
            footer_code: true,
            image_share: {
                id: true,
                title: true
            }
        }
    }
}

export const queryImageField = () => ({
    id: true,
    title: true
})