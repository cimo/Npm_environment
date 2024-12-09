import Fs from "fs";

export const loadFile = (path: string) => {
    const resultList = {};

    if (typeof process !== "undefined") {
        if (!Fs.existsSync(path)) {
            throw new Error(`Environment file ${path} not found!`);
        }

        const data = Fs.readFileSync(path, "utf-8").split("\n");

        for (const line of data) {
            const [key, value] = line.split("=");

            if (key && value) {
                const cleanedValue = value.trim().replace(/^'|'$/g, "");
                const finalValue = (process.env[key.trim()] && process.env[key.trim()] !== "") ? process.env[key.trim()] : cleanedValue;

                process.env[key.trim()] = finalValue;

                resultList[`process.env.${key.trim()}`] = `'${finalValue}'`;
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
