import {TypeDirectusEntity,TypeDirectusDto, TypeIdField, TypeImageEntity} from "./directus.type";


export interface TypeResponseStatus {
    code : number
    status: status
    msg?: string
    data?:any
}

enum status {
    success = "Success",
    error = "Error"
}

export interface TypeTagsEntity extends TypeDirectusEntity {
    translations?:{
        tags_id?: TypeIdField,
        languages_code?: string,
        title?:string
    }
}


export interface TypeTagsDto extends TypeDirectusDto {
    id?: TypeIdField
    title?:string
    status?: status
}