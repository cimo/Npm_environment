import Fs from "fs";

// Source
import * as Model from "./Model";

export const loadFile = (path: string): Model.IvariableList => {
    const resultList = {};

    if (typeof process !== "undefined") {
        if (!Fs.existsSync(path)) {
            throw new Error(`Environment file ${path} not found!`);
        }

        const data = Fs.readFileSync(path, "utf-8").split("\n");

        for (const line of data) {
            const [key, value] = line.split("=");

            if (key && value) {
                const cleanedKey = key.trim();

                const cleanedValue = value.trim().replace(/^'|'$/g, "");
                const finalValue = !Object.prototype.hasOwnProperty.call(process.env, cleanedKey) ? cleanedValue : process.env[cleanedKey] || "";

                process.env[cleanedKey] = finalValue;

                resultList[`process.env.${cleanedKey}`] = `'${finalValue}'`;
            }
        }
    }

    return resultList;
};

export const checkVariable = (key: string): string => {
    if (typeof process !== "undefined") {
        const value = process.env[key];

        if (value === undefined) {
            throw new Error(`Environment ${key} value is not defined!`);
        }

        return value;
    }

    return "";
};
