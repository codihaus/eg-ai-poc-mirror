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


    for await (const _event of run) {
        const payloadFE: any = {
            event: _event.event,
            data: _event.data?.delta?.content ?? {},
            citations: []
        }

        if (_event.data?.delta?.content) {
            const [item] = _event.data?.delta?.content

            const {text} = item
            const {annotations} = item.text
            const citations = [];

            if (annotations) {
                console.log(JSON.stringify(_event, null, 4))

                let index = 0;
                for (const annotation of annotations) {
                    const {file_citation} = annotation;
                    if (file_citation) {
                        const citedFile = await openai.files.retrieve(file_citation.file_id).catch(e => {
                            return false;
                        });
                        if (citedFile) {
                            citedFile.filename = citedFile.filename.replace(/\.pdf$/, "");
                            citations.push({
                                index,
                                file: citedFile,
                                file_id: file_citation.file_id,
                            });
                        }
                        // text.value = text.value.replace(annotation.text, ``);
                    }
                    index++;
                }
            }

            payloadFE.citations = citations;
            message += text.value;

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

    console.log(message)

    res.write(JSON.stringify({
        event: "final",
        content: message
    }))

    return res.end(() => {

    })
})
