import Fs from "fs";

// Source
import * as Model from "./Model";

export const loadFile = (path: string): Model.IvariableList => {
    const resultObject: Model.IvariableList = {};

    if (typeof process !== "undefined") {
        if (!Fs.existsSync(path)) {
            throw new Error(`Environment file ${path} not found!`);
        }

        const fileLine = Fs.readFileSync(path, "utf-8").split("\n");

        for (const line of fileLine) {
            const [key, value] = line.split("=");

            if (key && value) {
                const keyCleaned = key.trim();

                const valueCleaned = value.trim().replace(/^'|'$/g, "");
                const valueFinal = !Object.prototype.hasOwnProperty.call(process.env, keyCleaned) ? valueCleaned : process.env[keyCleaned] || "";

                process.env[keyCleaned] = valueFinal;

                resultObject[`process.env.${keyCleaned}`] = `'${valueFinal}'`;
            }
        }
    }

    return resultObject;
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
