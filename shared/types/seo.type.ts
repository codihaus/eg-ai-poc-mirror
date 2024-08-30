export const SEO_MODULE_NAME = 'module_seo_settings';
export const SEO_ADVANCE_NAME = 'seo_advanced';
export const SEO_ADVANCE_TRANS_NAME = 'seo_advanced_translations';

export type TypeSeoGeneral = {
    robot: string
    mode: string
    index: string
    image_share: string
}
export const fieldSeoGeneral = {
    "robot": "",
    "mode": "",
    "index": "",
    "image_share": "",
}

export type TypeSeoDetailEntity = {
    meta_title: string,
    meta_description: string,
    meta_keywords: string,
    robots: string,
    header_code: string,
    footer_code: string,
    image_share: string,
    collection: string,
    schema_code:string,
    
}

export const queryFieldSeoDetail = {
    meta_title: true,
    meta_description: true,
    meta_keywords: true,
    robots: true,
    schema_code:true,
    header_code: true,
    footer_code: true,
    image_share: true,
    collection: true,

}

export const queryFieldSeoDetailTrans = {
        meta_title: true,
        meta_description: true,
        meta_keywords: true,
        schema_code:true,
        robots: true,
        header_code: true,
        footer_code: true,
        image_share: true

}
