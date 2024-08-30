//@ts-ignore
import Base64 from "crypto-js/enc-base64.js";
//@ts-ignore
import AES from "crypto-js/aes.js";
//@ts-ignore
import Utf8 from "crypto-js/enc-utf8.js";

const key = "";

export const encrypt = (params: any) => {
    let encJson = AES.encrypt(JSON.stringify(params), key).toString();
    let encData = Base64.stringify(Utf8.parse(encJson));
    return encData;
};

export const decrypt = (word: any) => {
    let decData = Base64.parse(word).toString(Utf8);
    let bytes = AES.decrypt(decData, key).toString(Utf8);
    return JSON.parse(bytes);
};
