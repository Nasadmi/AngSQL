import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class ShareService { 
    variable: string | number | boolean = false;
    updateVariable(value: string | number | boolean) {
        this.variable = value;
    }
}