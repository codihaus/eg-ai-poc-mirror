
export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const {
        thread_id,
        msg_id
    } = body;

    const {
        openai,
    } = event.context

    const messages = await openai.beta.threads.messages.retrieve(thread_id, msg_id);

    return {
        statusCode: 200,
        message: messages
    }
})
