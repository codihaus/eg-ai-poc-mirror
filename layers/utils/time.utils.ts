import { useDateFormat } from "@vueuse/core";

const DATE_FORMAT = "DD/MM/YYYY";
const TIME_FORMAT = "h:mm A";

export const convertUnixTimeStampToDateTime = (unix_timestamp: any) => {
    // ex: 1661705999 => Date
    return new Date(+unix_timestamp * 1000);
};

export const parseDateToTimestamp = (date: string) => {
    // ex: 20/04/2022 => timestamp
};

export const generateTimeField = (date: any) => {
    return date ? useDateFormat(date, TIME_FORMAT) : "";
};

export const generateDateField = (date: any) => {
    return date ? useDateFormat(date, DATE_FORMAT) : "";
};
