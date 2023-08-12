import { Injectable } from "@angular/core";

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Connections, Root, TokenData } from "src/models/connections.model";

@Injectable({
    providedIn: 'root'
})

export class HttpService {
    constructor(private http: HttpClient) { }
    
    get({ url, type, headers }: { url: string; type: unknown; headers: HttpHeaders | undefined }) {
        return this.http.get<typeof type>(url, {
            headers: headers
        });
    }

    post({ url, type, body }: { 
        url: string; 
        type: Connections[] 
        | Root['connectionsInterfaces'] 
        | TokenData 
        | string[] 
        | string; 
        body: Connections |
        { data: string } 
        | undefined 
        | TokenData; }) {
        return this.http.post<typeof type>(url, body);
    }
}