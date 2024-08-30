import { statSync } from "fs";

export function fileExists(filePath: string)
{
    try {
        return statSync(filePath).isFile();
    } catch (err) {
        return false;
    }
}