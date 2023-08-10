import { Router } from "express";

import * as JWT from "jsonwebtoken";

import connections from "../config/connections.json"
import { ConnectionsStruct } from "../config/types";

const router = Router();

router.post('/api/auth/verify', async (req,res) => {
    const { token, key } = req.body;
    try {
        JWT.verify(token, key);
        res.json({
            message: true
        })
    } catch (error) {
        res.json({
            message: false
        })
    }
})

router.post('/api/auth/decode', async (req,res) => {
    const { token } = req.body;
    try {
        const decoded: ConnectionsStruct = JWT.decode(token) as ConnectionsStruct;

        const data = connections.find(connection => 
            connection.host === decoded.host &&
            connection.port === decoded.port &&
            connection.user === decoded.user &&
            connection.passwordKey === decoded.passwordKey &&
            connection.database === decoded.database
        )
        
        if (data === undefined) {
            return res.json({
                error: true
            })
        }

        res.json({
            host: data.host,
            port: data.port,
            user: data.user,
            database: data.database
        })
    } catch (error) {
        res.json({
            error: true
        })
    }
})

export { router as authAPI }