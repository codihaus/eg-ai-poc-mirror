import { parse } from "qs";

export default defineEventHandler(async (event) => {

    const url = getRequestURL(event);
    let urlDecode = decodeURIComponent(url.search.replace("?", ""));
    const query = parse(urlDecode);

    if (query.filter && typeof query.filter === "string") {
        query.filter = JSON.parse(query.filter);
    }

    if (query.aggregate && typeof query.aggregate === "string") {
        query.aggregate = JSON.parse(query.aggregate);
    }

    event.context.query_parsed = query;
})
