export interface ConnectionsStruct {
    host: string;
    port: number;
    user: string;
    passwordKey: string;
    password: string;
    database: string;
}

export interface MySQLConnectionStruct {
    host: string;
    port: number;
    user: string;
    password: string;
    database?: string;
}

export interface MySQLResponseDatabases {
    Database: string;
}