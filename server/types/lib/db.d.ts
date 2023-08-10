import { MySQLConnectionStruct } from "../config/types";
import { Connection } from "mysql2/typings/mysql/lib/Connection";
export declare class MySQLController {
    data: MySQLConnectionStruct;
    connection: Connection;
    constructor(data?: MySQLConnectionStruct);
    Connect(): Promise<{
        err: boolean;
        message: string | null;
    }>;
    Query(query: string): Promise<{
        err: boolean;
        message: string | null;
        result?: unknown | unknown[];
        fields?: unknown | unknown[];
    }>;
}
