import { Router } from "express";
import { encrypt } from "../lib/crypt";
import { ConnectionsStruct } from "../config/types";
import connections  from "../config/connections.json"
import { addConnection } from "../lib/connectionHandler";

const router = Router();

const arr: unknown[] = []

function getConnections() {
    for (let i = 0; i < connections.length; i++) {
        if (i === 0) {
            continue;
        }
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

router.post('/api/connections/add', async (req, res) => {
    const { host, port, user, password, database } = req.body
    const passwordEncrypted = encrypt(password)

    const exists = connections.includes(connections.find(
        connection => 
        connection.host === host && 
        connection.port === port && 
        connection.user === user 
    ) as ConnectionsStruct)

    if (!exists) {
        await addConnection({
            host: host,
            port: port,
            user: user,
            password: passwordEncrypted,
            database: database
        })
        res.json({
            message: true
        })
    } else {
        res.json({
            message: false
        })
    }
})

export { router as connectionsAPI }