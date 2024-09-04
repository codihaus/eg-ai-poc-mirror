import {createItem} from "@directus/sdk";

export default defineEventHandler(async (event) => {
    const {
        openai,
    } = event.context

    console.log('openai', openai)

    const thread = await openai.beta.threads.create();

    // Create Thread in Directus
    const body = await readBody(event);
    event.context.api_client.request(
        createItem(
            "chat_threads",
            {
                thread_id: thread.id,
                assistant_id: process.env.OPENAI_ASSISTANT_ID,
                title: body?.title || ''
            }
        )
    )

    return {
        statusCode: 200,
        thread: thread,
    }
})
