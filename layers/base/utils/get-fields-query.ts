import { enabledMultiLanguage } from "~/config"

export function getFieldsQuery(fields: string[] = []) {
    return fields?.filter((field) => {
        if( enabledMultiLanguage ) {
            return field
        }
        return ! field.includes('translation')
    })
}