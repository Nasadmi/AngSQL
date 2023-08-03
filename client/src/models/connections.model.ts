export interface Root {
    connectionsInterfaces: Connections
    connections: Connections[]
}

interface Response {
    error?: boolean;
    message?: string | boolean
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