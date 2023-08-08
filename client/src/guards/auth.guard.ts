import { Injectable } from "@angular/core";
import { UrlTree, Router } from "@angular/router";
import { AuthService } from "src/services/auth.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard {
    constructor(private authService: AuthService, private router: Router) { }

    canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const connectionData = sessionStorage.getItem('connection');
        
        if (connectionData === null) {
            return this.router.parseUrl('/404');
        }

        const { key, token } = JSON.parse(connectionData)
        
        if (token === null || key === null) {
            return this.router.parseUrl('/404');
        }        

        if (this.authService.verifyToken(token, key)) {
            return this.router.parseUrl('/404');
        }

        return true;
    }
}