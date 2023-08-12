import { Injectable } from "@angular/core";

import { Subject } from "rxjs";

import { Response } from "src/models/connections.model"

@Injectable({
    providedIn: "root"
})

export class ShareService {
    private change = new Subject<boolean>()
    changeObservable = this.change.asObservable()
    private response = new Subject<Response | undefined>()
    responseObservable = this.response.asObservable()

    changeValue({ change }: { change: boolean }) {
        this.change.next(change)
    }

    changeResponse({ response }: { response: Response | undefined }) {
        this.response.next(response)
    }
}