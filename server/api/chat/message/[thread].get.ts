
//https://platform.openai.com/docs/api-reference/messages/listMessages

import { set } from "lodash-es";

export default defineEventHandler(async (event) => {
    const thread = getRouterParam(event, "thread") as any;
    const query = getQuery(event);

    const {
        openai,
    } = event.context

    const threadMessages = await openai.beta.threads.messages.list(
        thread,
        query
    );

    let messages = threadMessages.data
    
    for await (const [index, message] of threadMessages.data?.entries()) {
        let files = []
        const [item] = message?.content

        const {text} = item
        const {annotations} = item.text
        const citations = [];
    
        if (annotations) {
            // console.log('annotations', JSON.stringify(_event, null, 4))

            // let index = 0;
            for (const annotation of annotations) {
                const {file_citation} = annotation;
                if (file_citation) {
                    const citedFile = await openai.files.retrieve(file_citation.file_id).catch(e => {
                        return false;
                    });
                    if (citedFile) {
                        citedFile.filename = citedFile.filename.replace(/\.pdf$/, "");
                        citations.push({
                            // index,
                            file: citedFile,
                            file_id: file_citation.file_id,
                        });
                    }

                    const existFile = files?.find((file) => file.file_id === file_citation?.file_id)

                    if( !existFile ) {
                        files.push({
                            index: (files.length) || 1, 
                            file: citedFile,
                            file_id: file_citation.file_id,
                        })
                    }
                    set(messages, `${index}.content.0.text.value`, text?.value?.replace(annotation.text, `**(${existFile?.index || (files.length) || 1})**`))
                    set(messages, `${index}.files`, files)
                }
                // index++;
            }
        }
    }

    return {
        statusCode: 200,
        messages
    }
})
