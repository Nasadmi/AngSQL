import { Injectable } from "@angular/core";

import { HttpService } from "./http.service";
import { SERVER_HOST } from "src/consts";
import { Root, TokenData } from "src/models/connections.model";

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    constructor(private http: HttpService) { }
    verifyToken(token: string, key: string): boolean {
        let verify: boolean = false
        const data: TokenData = {
            token: token,
            key: key
        }
        this.http.post({
            url: `${SERVER_HOST}/api/auth/verify`,
            type: data as TokenData,
            body: data
        }).subscribe(res => {
            const response = res as Root['connectionsInterfaces'];
            console.log(response);
            verify = response.message as boolean
        })
        return verify;
    }

    GetDatafromToken(token: string) {
        const data: TokenData = {
            token: token,
        }

        this.http.post({
            url: `${SERVER_HOST}/api/auth/decode`,
            type: data as TokenData,
            body: data
        }).subscribe(res => {
            const response = res as Root['connectionsInterfaces'];
            return response.message as unknown
        })
        
    }
}