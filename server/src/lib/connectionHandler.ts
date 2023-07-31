import * as fs from "node:fs";

import * as path from "node:path"

import connections from "../config/connections.json"

import { ConnectionsStruct } from "../config/types";

export async function addConnection(connection: ConnectionsStruct) {
    connections.push(connection);
    fs.writeFile(path.join(__dirname, "../config/connections.json"), JSON.stringify(connections, null, 4), (err) => {
        if (err) throw err;
    });
}

export async function removeConnection(connection: ConnectionsStruct) {
    connections.splice(connections.indexOf(connection), 1);
    fs.writeFile(path.join(__dirname, "../config/connections.json"), JSON.stringify(connections, null, 4), (err) => {
        if (err) throw err;
    });
}