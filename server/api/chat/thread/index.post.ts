import {createItem} from "@directus/sdk";

export default defineEventHandler(async (event) => {
    const {
        openai,
    } = event.context

    const thread = await openai.beta.threads.create();

    // Create Thread in Directus
    // const body = await readBody(event);
    // event.context.api_client.request(
    //     createItem(
    //         "chat_thread" as never,
    //         {
    //             id: thread.id,
    //             assistant_id: assistant_id,
    //             title: body?.title || ''
    //         } as never
    //     )
    // )

    return {
        statusCode: 200,
        thread: thread,
    }
})
