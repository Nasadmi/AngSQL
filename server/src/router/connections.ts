import { Router } from "express";

import { connections } from "../config/connections"

const router = Router();

const arr: unknown[] = []

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

router.get('/api/connections/get', (req, res) => {
    res.json(connection)
})

export { router as connectionsAPI }