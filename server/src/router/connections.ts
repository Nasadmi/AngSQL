import { Router } from "express";

import { connections } from "../config/connections"

import { ConnectionsStruct } from "../config/types"

const router = Router();

let arr: any[] = []

function getConnections() {
    for (let i = 0; i < connections.length; i++) {
        arr.push({
            host: connections[i].host,
            port: connections[i].port,
            user: connections[i].user,
            database: connections[i].database
        })
    }
    return arr
}

const connection = getConnections()

router.post('/api/connections/get', (req, res) => {
    console.log(connection)
    res.json({
        connects: connection
    })
})

export { router as connectionsAPI }