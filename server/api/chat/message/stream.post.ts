import { set } from 'lodash-es'

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const res = event.node.res
    const {
        openai,
        assistant_id
    } = event.context

    if (!assistant_id) {
        res.write(JSON.stringify({
            event: "final",
            content: JSON.stringify({
                statusCode: 400,
                message: 'Assistant ID is required'
            })
        }))

        return res.end(() => {
        })
    }


    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')

    let attachments;
    if (body.files) {
        attachments = body.files.map((file: any) => {
            return {
                file_id: file,
                tools: [{
                    type: "file_search",
                }]
            }
        })
    }

    await openai.beta.threads.messages.create(
        body.thread_id,
        {
            role: "user",
            content: body.content,
            attachments
        }
    );

    const run = await openai.beta.threads.runs.create(body.thread_id, {
        assistant_id: assistant_id,
        stream: true
    })

    let message = "";

    let files = []

    for await (const _event of run) {

        let content = _event.data?.delta?.content || []

        let payloadFE: any = {
            event: _event.event,
            data: content ?? {},
            citations: [],
            files: [],
        }

        if (content) {
            const citations = [];

            for await (const [index, item] of content?.entries()) {
                
                // console.log('item', JSON.stringify(item, null, 4))
                
                const image_file = item?.image_file?.file_id

                if( image_file ) {
                    const file_info = await openai.files.retrieve(image_file).catch(e => {
                        return false;
                    })
                    if( file_info ) {
                        const response = await openai.files.content(image_file);
                        const bufferView = new Uint8Array(await response.arrayBuffer());
                        const fileURI = Buffer.from(bufferView).toString('base64')

                        set(payloadFE.data, `${index}.file_url`, fileURI)
                        
                        console.log('payloadFE', JSON.stringify(payloadFE.data, null, 4))
                    }
                }
                
                const annotations = item?.text?.annotations

                if (annotations) {
                    for (const annotation of annotations) {
                        const {file_citation} = annotation;
                        if (file_citation) {
                            const citedFile = await openai.files.retrieve(file_citation.file_id).catch(e => {
                                return false;
                            });
                            if (citedFile) {
                                citedFile.filename = citedFile.filename.replace(/\.pdf$/, "");
                                // citations.push({
                                //     index,
                                //     file: citedFile,
                                //     file_id: file_citation.file_id,
                                // });
    
                                const existFile = files?.find((file) => file.file_id === file_citation?.file_id)
    
                                if( !existFile ) {
                                    files.push({
                                        index: (files.length) || 1, 
                                        file: citedFile,
                                        file_id: file_citation.file_id,
                                    })
                                }
                                // payloadFE.data[index].text.value = payloadFE.data[index].text.value.replace(annotation.text, `**(${existFile?.index || (files.length) || 1})**`);
                            }
                        }
                    }
                }
            }


            // payloadFE.citations = citations;
            payloadFE.files = files;
            message += payloadFE.data?.filter((item) => item?.text)?.map((item) => item.text.value);

            // if (annotations) {
            //     console.log(JSON.stringify({
            //         text: text.value,
            //         citations
            //     }, null, 4))
            // }
        }

        let output = payloadFE.event === 'thread.run.created' ? JSON.stringify(payloadFE) : ',' + JSON.stringify(payloadFE)

        res.write(output)
    }

    res.write(JSON.stringify({
        event: "final",
        content: message
    }))

    return res.end(() => {

    })
})
