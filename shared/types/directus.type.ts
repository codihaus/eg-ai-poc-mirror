export interface TypeDirectusEntity {
    id?:string | number
    status?:string
    sort?: number
    user_created?: string | TypeUserDirectusEntity
    user_updated?:string | TypeUserDirectusEntity
    date_created?: Date
    date_updated?:Date
}


export interface TypeDirectusDto {
    id?:string | number
    status?:string
    sort?: number
    user_created?: string | TypeUserDirectusDto
    user_updated?:string | TypeUserDirectusDto
    date_created?: string
    date_updated?: string
    date_created_value?: Date
    date_updated_value?: Date
}

export type TypeIdField = string | number

export type TypeImageEntity = string | {
    id?: string,
    title?:string
    filesize?: number,
    type?:string,
    filename_download?:string,
}

type TypeUserDirectusEntity = {
    id?:string | number,
    avatar?: TypeImageEntity,
    email?: string,
    password?:string
    first_name?: string,
    last_name?:string,
    role ?:{
        id?: string
        admin_access?:boolean,
        app_access?: string
    }
}

type TypeUserDirectusDto = {
    id?:string | number,
    avatar?: string,
    email?: string,
    password?:string
    first_name?: string,
    last_name?:string,
    role ?:{
        id?: string
        admin_access?:boolean,
        app_access?: string
    }
}

export interface TypeTransportResponse {
    raw?: any
    data?:any
    status?: number
    statusText?: string
    headers?: any
}

