import { Router } from "express";

import { db } from "./connections";

import { MySQLResponseDatabases } from "../config/types";

import * as JWT from "jsonwebtoken";

const router = Router();

router.get("/api/db/databases", async (req, res) => {
    const verifyPower = {
        token: req.header('X-Authorization-Token') as string,
        key: req.header('X-Authization-Key') as string
    }
    try {
        JWT.verify(verifyPower.token, verifyPower.key);
        db.query("SHOW DATABASES", (err, result) => {
            const arr: string[] = []; 
            if (err) {
                res.json({
                    err: true,
                    message: err.message
                });
            } else {
                const databaseList = result as MySQLResponseDatabases[]
                databaseList.forEach(database => {
                    arr.push(database.Database)
                })
                res.json({
                    err: false,
                    data: arr
                });
            }
        });
    } catch (error) {
        res.json({
            err: true,
            message: "Invalid token or Invalid query"
        });
    }
})

router.post('/api/db/query', async (req, res) => {
    const { data } = req.body;
    db.query(data, (err, result) => {
        if (err) {
            res.json({
                error: true,
                message: err.message
            })
        } else {
            res.json({
                error: false,
                message: result
            })
        }
    })
})

export { router as dbAPI };