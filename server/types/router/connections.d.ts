import * as mysql from "mysql2";
declare const router: import("express-serve-static-core").Router;
declare let db: mysql.Connection;
export { router as connectionsAPI, db };
