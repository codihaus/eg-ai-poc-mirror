
//https://platform.openai.com/docs/api-reference/messages/listMessages

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

    return {
        statusCode: 200,
        messages: threadMessages.data,
    }
})
