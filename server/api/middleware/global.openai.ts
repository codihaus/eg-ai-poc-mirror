// Get config from api
// Create Open AI instance

import OpenAI from "openai";

export default defineEventHandler(async (event) => {

    if ( !process.env.OPENAI_API_KEY ) {
        throw new Error('OpenAI API Key is required');
    }

    event.context.assistant_id = process.env.OPENAI_ASSISTANT_ID;
    event.context.openai = new OpenAI();
})
