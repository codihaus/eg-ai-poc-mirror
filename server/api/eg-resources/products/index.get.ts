import { customEndpoint } from '@directus/sdk'

export default defineEventHandler(async (event) => {
    const {
        openai,
        assistant_id
    } = event.context

    const api = event.context.api_client

    const query = await getQuery(event);

    return await api.request(customEndpoint({
        method: 'GET',
        path: `/eg-resources/products?search_text=${query?.search}&sort_by=[["date_created","asc"]]&status=[["neq","archived"], ["eq", "published"]]&type=[["eq", ${query?.type}]]&metadata={"pixel_dimension":"1024x768"}&page=${query?.page || 1}&limit=${query?.limit || 4}`
    }))
})
