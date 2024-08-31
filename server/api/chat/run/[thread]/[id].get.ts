

export default defineEventHandler(async (event) => {
    const {
        openai,
        assistant_id
    } = event.context


    const run = await openai.beta.threads.runs.retrieve(
        getRouterParam(event, "thread") as any,
        getRouterParam(event, "id") as any
    );

    return {
        statusCode: 200,
        run: run
    }
})
