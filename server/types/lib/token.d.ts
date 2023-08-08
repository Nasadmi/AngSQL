/// <reference types="node" />
import * as jwt from 'jsonwebtoken';
export declare function generateToken(payload: string | object | Buffer, key: string): string;
export declare function verifyToken(token: string, key: string): string | jwt.JwtPayload;
export declare function decodeToken(token: string): string | jwt.JwtPayload | null;
