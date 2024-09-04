export const createContact = (params) =>
    () => {
        return {
            path: `/contact/create`,
            body: JSON.stringify(params),
            method: 'POST',
        };
    }
