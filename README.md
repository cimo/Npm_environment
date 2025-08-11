# Npm_environment

Npm package, environment file processor. Light, fast and secure.
Writed with native Typescript code and no dependencies are used.

## Pack

1. npm run pack
2. Copy the file "package_name-x.x.x.tgz" in the project root folder.
3. In the "package.json" file insert: "@cimo/package_name": "file:package_name-x.x.x.tgz"

## Publish

1. npm run build
2. npm login --auth-type=legacy
3. npm publish --auth-type=legacy --access public

## Installation

1. Link for npm package -> https://www.npmjs.com/package/@cimo/environment

## Env file (write the value inside a single quote). If a variable is already set in the pipeline, it will be used instead of the value from the file.

DOMAIN='localhost'

## Server

-   Server.ts

```
...

import { Ce } from "@cimo/environment/dist/src/Main";

...

Ce.loadFile(`./env/local.env`);

export const DOMAIN = Ce.checkVariable("DOMAIN") || (process.env.DOMAIN as string); // Available on backend and frontend
export const SECRET = Ce.checkVariable("SECRET"); // Available only on backend

...

```

## Webpack

-   webpack.build.js

```
...

const { Ce } = require("cimo@/environment/dist/src/Main");

...

const ceList = Ce.loadFile("./env/local.env");

const DOMAIN = Ce.checkVariable("DOMAIN") || (process.env.DOMAIN as string); // Available on backend and frontend
const SECRET = Ce.checkVariable("SECRET"); // Available only on backend

...

module.exports = {
    ...
    plugins: [
        new webpack.DefinePlugin(ceList),
        ...
    ]
    ...
};

...

```
