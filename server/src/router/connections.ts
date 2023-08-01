import { Router } from "express";
import { decrypt, encrypt } from "../lib/crypt";
import { ConnectionsStruct } from "../config/types";
import connections  from "../config/connections.json"
import { addConnection, removeConnection } from "../lib/connectionHandler";

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

let connection = getConnections()

router.get('/api/connections/get', (req, res) => {
    res.json(connection)
})

router.post('/api/connections/add', async (req, res) => {
    const { host, port, user, password, database } = req.body
    const { data, key } = encrypt(password)

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
            password: data,
            passwordKey: key,
            database: database
        })
        connection = getConnections()
        res.json({
            message: true
        })
    } else {
        res.json({
            message: false
        })
    }
})

router.post('/api/connections/delete', async (req, res) => {
    const { host, port, user, password } = req.body

    let { database } = req.body

    const exists = connections.includes(connections.find(
        connection =>
        connection.host === host && 
        connection.port === port && 
        connection.user === user
    ) as ConnectionsStruct)

    if (!exists) {
        res.json({
            message: false
        })
    } else {
        if (database === undefined) {
            database = ""
        }
        
        const passwordFound = connections.find(connection => 
            decrypt(connection.password, connection.passwordKey) === password &&
            connection.host === host &&
            connection.port === port &&
            connection.user === user &&
            connection.database === database
        )
        
        if (passwordFound === undefined) {
            return res.json({
                message: 'Password'
            })
        }

        await removeConnection(passwordFound as ConnectionsStruct)

        connection = getConnections()

        res.json({
            message: true
        })
    }
})

export { router as connectionsAPI }