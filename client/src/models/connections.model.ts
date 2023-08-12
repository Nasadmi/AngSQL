export interface Root {
    connectionsInterfaces: Connections
    connections: Connections[]
}

export interface TokenData {
    token: string
    key?: string
}

export interface Response {
    error?: boolean;
    message?: string | boolean | TokenData
}

interface OtherData {
    passwordExample?: string,
}

export interface Connections extends Response, OtherData{
    host: string;
    port: number | string | null;
    user: string;
    database?: string;
    password?: string;
}