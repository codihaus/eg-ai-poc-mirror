import { customEndpoint, readItems } from '@directus/sdk'
import { APIService } from '~/layers/directus/server/api-service';

export default defineEventHandler(async (event) => {
    const {
        openai,
        assistant_id
    } = event.context

    // const api = event.context.api_client

    const query = await getQuery(event);

    const api = await APIService.getInstance()
    console.log('search API', `/eg-resources/products?search_text=&sort_by=[["date_created","asc"]]&status=[["neq","archived"], ["eq", "published"]]&type=[["eq", 8]]&metadata={"pixel_dimension":"1024x768"}`)
    return await api.request(readItems('products', {
        filter: {
            _and: [
                {
                    type: {
                        _eq: query?.type
                    }
                },
                {
                    status: {
                        _eq: 'published'
                    }
                }
            ]
        },
        fields: ['thumbnail.id', 'thumbnail.filename_download'],
        search: query?.search
    }))
    // return await api.request(customEndpoint({
    //     method: 'GET',
    //     path: encodeURI(`/eg-resources/products?search_text=${query?.search}&sort_by=[["date_created","asc"]]&status=[["neq","archived"], ["eq", "published"]]&type=[["eq", ${query?.type}]]&metadata={"pixel_dimension":"1024x768"}&page=${query?.page || 1}&limit=${query?.limit || 4}`)
    // }))
})
