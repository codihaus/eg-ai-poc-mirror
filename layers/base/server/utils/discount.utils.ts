export const transformDiscount = (item: any) => {
    return {
        id: item.id,
        title: item.title,
        target: item.target,
        product: item.product,
        description: item.description,
        type: item.type,
        value_bint: item.value_bint,
        value_percent: item.value_percent,
        max_value: item.max_value,
        price_mark: item.price_mark,
        vendor: item.vendor,
    };
};
