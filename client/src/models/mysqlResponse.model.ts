export interface MySQLDatabase {
    name: string;
}

export type MySQLRoot = {
    database: MySQLDatabase;
    databases: Array<MySQLDatabase>
}