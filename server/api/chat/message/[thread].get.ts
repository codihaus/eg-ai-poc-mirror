
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
    
    for await (const [index, message] of messages?.entries()) {
        let files = []
        for (let indexContent = 0; indexContent < message?.content?.length; indexContent++) {
            const item = message?.content[indexContent];
            
            const image_file = item?.image_file?.file_id
            if( image_file ) {
                let file_info = await openai.files.retrieve(image_file).catch(e => {
                    return false;
                })
                if( file_info ) {
                    const response = await openai.files.content(image_file);
                    const bufferView = new Uint8Array(await response.arrayBuffer());
                    const fileURI = Buffer.from(bufferView).toString('base64')

                    messages[index].content[indexContent].text = {
                        value: `<p><img src="data:image/jpg;base64,${fileURI}" /></p>`,
                        file_info,
                        file: fileURI
                    }
                }
            }
            
            const annotations = item?.text?.annotations
        
            if (annotations) {
    
                // let index = 0;
                for (const annotation of annotations) {
                    const {file_citation} = annotation;
                    if (file_citation) {
                        const citedFile = await openai.files.retrieve(file_citation.file_id).catch(e => {
                            return false;
                        });
                        if (citedFile) {
                            citedFile.filename = citedFile.filename.replace(/\.pdf$/, "");
                        }
    
                        const existFile = files?.find((file) => file.file_id === file_citation?.file_id)
    
                        if( !existFile ) {
                            files.push({
                                index: (files.length) || 1, 
                                file: citedFile,
                                file_id: file_citation.file_id,
                            })
                        }
                        set(messages, `${index}.content.${indexContent}.text.value`, item?.text?.value?.replace(annotation.text, ` **(${existFile?.index || (files.length) || 1})** `))
                        set(messages, `${index}.files`, files)
                    }
                }
            }
        }
    }

    messages = messages.filter((message) => message.assistant_id !== process.env.OPENAI_SEARCH_ASSISTANT_ID)

    return {
        statusCode: 200,
        messages
    }
})
