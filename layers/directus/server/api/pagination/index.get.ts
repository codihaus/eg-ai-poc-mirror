import {aggregate} from "@directus/sdk";
import {get} from "lodash-es";

export default defineEventHandler(async (event) => {
    const {api} = event.context

    const {
        collection
    } = getQuery(event)

    const query = {
        fields: ["*"],
        ...event.context.query_parsed,
    }

    const [detail] = await api.request(
        aggregate(collection, {
                aggregate: {
                    countDistinct: "*"
                },
                query: {
                    filter: query.filter
                }
            }
        ))

    return {
        data: get(detail?.countDistinct, "*", 0)
    }
})
