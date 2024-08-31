
export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, "id") as any;
    const {
        openai,
        assistant_id
    } = event.context

    const assistant = await openai.beta.assistants.retrieve(assistant_id)

    return {
        statusCode: 200,
        assistant
    }
})
