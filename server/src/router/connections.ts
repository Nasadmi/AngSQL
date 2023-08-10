import { Router } from "express";
import { decrypt, encrypt, getRandomString } from "../lib/crypt";
import { ConnectionsStruct } from "../config/types";
import connections  from "../config/connections.json"
import { addConnection, removeConnection, editConnection } from "../lib/connectionHandler";
import * as tokenHandler from "jsonwebtoken";
import * as mysql from "mysql2";

const router = Router();

let arr: unknown[] = []

let db: mysql.Connection;

function getConnections() {
    arr = []
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

router.post('/api/connections/edit', async (req, res) => {
    const { host, port, user, passwordExample } = req.body
    let { password, database } = req.body

    if (password === undefined) {
        password = passwordExample
    }

    if (database === undefined) {
        database = ""
    }

    const findData = connections.find(connection => 
        decrypt(connection.password, connection.passwordKey) === passwordExample &&
        connection.database === database
    )

    if (findData === undefined) {
        return res.json({
            message: 'Password'
        })
    }

    const indexData = connections.indexOf(findData as ConnectionsStruct)

    const encryptPassword = encrypt(password)

    await editConnection(
        {
            host: host,
            port: port,
            user: user,
            password: encryptPassword.data,
            passwordKey: encryptPassword.key,
            database: database
        }, indexData
    )

    connection = getConnections()

    res.json({
        message: true
    })
})

router.post('/api/connections/connect', async (req, res) => {
    const { host, port, user, password } = req.body
    let { database } = req.body

    if (database === undefined) {
        database = ""
    }

    const findData = connections.find(connection => 
        decrypt(connection.password, connection.passwordKey) === password &&
        connection.host === host &&
        connection.port === port &&
        connection.user === user
    )

    if (findData === undefined) {
        return res.json({
            message: 'Password'
        })
    }

    const connector = mysql.createConnection({
        host: findData.host,
        port: findData.port,
        user: findData.user,
        password: decrypt(findData.password, findData.passwordKey),
        database: findData.database === "" ? undefined : findData.database
    })

    connector.connect((err) => {
        if (err) {
            return res.json({
                error: true,
                message: err.message
            })
        }
    })

    db = connector

    const key = getRandomString(32)

    const token = tokenHandler.sign({
        host: findData.host,
        port: findData.port,
        user: findData.user,
        database: findData.database,
        passwordKey: findData.passwordKey
    }, key)

    res.json({
        message: {
            token: token,
            key: key
        }
    })
})

export { 
    router as connectionsAPI,
    db
 }