export interface Root {
    connectionsInterfaces: Connections
    connections: Connections[]
}

export interface Connections {
    host: string;
    port: number;
    user: string;
    database?: string;
}