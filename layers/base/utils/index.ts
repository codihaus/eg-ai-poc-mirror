// function to array to tree
export function slugify(str: string): string {
    return str
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^a-z0-9-]/g, "");
}

// calc total page for pagination
export const callTotalPage = (total: number, limit: number): number => {
    return Math.ceil(total / limit);
};

export const parsePrice = (price: string | number, coefficient?: string) => {
    if (!+price) return "--";

    if (coefficient)
        return (+price * +coefficient)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

/**
 * Dùng package này để format số vd 10K, 10M, 100KB, 100MB, vv...
 * @link https://www.npmjs.com/package/millify
 */

export const formatDateString = (date: string) => {
    const inputDate = new Date(date);
    return inputDate?.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
};

export const showDisplayTextSearch = (
    contentHtml: string,
    text?: string
): string => {
    if (!text) return contentHtml;
    // Use case-insensitive flag (i) in the regular expression:
    const regex = new RegExp(`(?<!<[^>]*)(${text})(?![^<]*>)`, "gi");

    const content = contentHtml?.replaceAll(
        /<span class="selector">(.*?)<\/span>/gi,
        "$1"
    );
    const parts = content?.split(regex);
    if (!parts) return "";
    return parts
        .map((part: any) =>
            regex.test(part) ? `<span class="selector">${part}</span>` : part
        )
        .join("");
};

export function clearObject(obj: any): any {
    const cleanedObject: any = {};

    for (const key in obj) {
        if (obj[key] !== undefined && obj[key] !== null) {
            if (Array.isArray(obj[key]) && obj[key].length === 0) {
                // Skip empty arrays
                continue;
            }
            cleanedObject[key] = obj[key];
        }
    }
    return cleanedObject;
}

export const hasChanged = (value: any, oldValue: any): boolean =>
    !Object.is(value, oldValue);

const hasOwnProperty = Object.prototype.hasOwnProperty;
export const hasOwn = (
    val: object,
    key: string | symbol
): key is keyof typeof val => hasOwnProperty.call(val, key);

export const isArray = Array.isArray;
export const isMap = (val: unknown): val is Map<any, any> =>
    toTypeString(val) === "[object Map]";

export const isSet = (val: unknown): val is Set<any> =>
    toTypeString(val) === "[object Set]";

export const isDate = (val: unknown): val is Date =>
    toTypeString(val) === "[object Date]";

export const isRegExp = (val: unknown): val is RegExp =>
    toTypeString(val) === "[object RegExp]";

export const isFunction = (val: unknown): val is Function =>
    typeof val === "function";

export const isString = (val: unknown): val is string =>
    typeof val === "string";

export const isSymbol = (val: unknown): val is symbol =>
    typeof val === "symbol";

export const isObject = (val: unknown): val is Record<any, any> =>
    val !== null && typeof val === "object";

export const objectToString = Object.prototype.toString;
export const toTypeString = (value: unknown): string =>
    objectToString.call(value);
