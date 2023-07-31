export interface Root {
    connectionsInterfaces: Connections
    connections: Connections[]
}

export interface Connections {
    host: string;
    port: number | string | null;
    user: string;
    database?: string;
    password?: string;
    message?: string;
}