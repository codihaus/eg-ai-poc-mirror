type languageCode = {
    code: string,
    name: string
}

export const convertLanguageCodeToCode = (data: languageCode[]) => {

    const resultLanguages: any[] = []

    if (data && data.length !== 0)
        data.forEach(e => {
            const codeLanguageClean = e.code.split("-").shift()

            resultLanguages.push(codeLanguageClean)
        })

    return resultLanguages
}

export const findLanguageMatch = (langsArr: any[], langMatch: any) => {
    let resultLanguageCode = "vi-VI"
    if (!langsArr) return '';

    langsArr.forEach((e: {code: string, name: string}) => {
        if(e.code.startsWith(langMatch))
        resultLanguageCode = e.code
    })

    return resultLanguageCode
}
