import { MySQLConnectionStruct } from "../config/types";
export declare function Connect(data: MySQLConnectionStruct): Promise<{
    err: boolean;
    message: string | null;
}>;
