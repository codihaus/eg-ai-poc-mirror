
export default defineEventHandler(async (event) => {
    const {
        openai,
        assistant_id
    } = event.context

    const id = getRouterParam(event, "id") as any;
    const thread = await openai.beta.threads.retrieve(
        id
    );

    return {
        statusCode: 200,
        thread: thread
    }
})
