import * as mysql from "mysql2";

import { MySQLConnectionStruct } from "../config/types";

export async function Connect(data: MySQLConnectionStruct) {
    return new Promise<{err: boolean, message: string | null}>((resolve) => {
        const connector = mysql.createConnection(data);
        connector.connect((err) => {
            if (err) {
                resolve({
                    err: true,
                    message: 'Could not connect to MySQL server.'
                });
            } else {
                resolve({
                    err: false,
                    message: null
                })
            }
        })
    })
}