import { Injectable } from "@angular/core";

import { HttpClient } from "@angular/common/http";
import { Connections, Root } from "src/models/connections.model";

@Injectable({
    providedIn: 'root'
})

export class HttpService {
    constructor(private http: HttpClient) { }
    
    get({ url, type }: { url: string; type: unknown; }) {
        return this.http.get<typeof type>(url);
    }

    post({ url, type, body }: { url: string; type: Connections[] | Root['connectionsInterfaces']; body: Connections | undefined; }) {
        return this.http.post<typeof type>(url, body);
    }
}