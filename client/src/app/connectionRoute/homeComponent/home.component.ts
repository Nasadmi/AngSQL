import { Component, OnInit, OnDestroy } from '@angular/core';
import { Root, TokenData, Response } from 'src/models/connections.model';
import { SERVER_HOST } from 'src/consts';
import { ShareService } from 'src/services/share.service';
import { Subscription } from 'rxjs';
import { HttpService } from 'src/services/http.service';
import * as alerts from "sweetalert2"

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  
  data: Root['connectionsInterfaces'] = {
    host: '',
    port: '',
    user: '',
    database: ''
  }

  subscription!: Subscription

  responseChange: Response | undefined

  token: string = JSON.parse(sessionStorage.getItem('connection') as string).token;
  
  constructor(private httpService: HttpService, private shareService: ShareService) {}

  detectChanges() {
    this.subscription = this.shareService.changeObservable.subscribe(newValue => {
      if (newValue) {
        this.shareService.changeValue({
          change: false,
        })
      }
    })
  }

  setLogs() {
    this.subscription = this.shareService.responseObservable.subscribe(newValue => {
      if ((newValue as Response).error) {
        (document.querySelector("#log") as HTMLElement).textContent += `ERR:TRUE:${((newValue as Response).message as string)}`.split('\n')[0] + '\n';
      } else {
        (document.querySelector("#log") as HTMLElement).textContent += `ERR:FALSE:${JSON.stringify((newValue as Response).message as string)}`.split('\n')[0] + '\n';
      }
    })
  }

  clearLogs() {
    (document.querySelector("#log") as HTMLElement).textContent = ""
  }

  disconnect(): void {
    alerts.default.fire({
      title: 'Disconnect',
      html: `
      Are you sure to disconnect from?:
      <br/>${this.data.host}:${this.data.port}`,
      icon:'warning',
      confirmButtonText: 'Ok',
      showCancelButton: true,
      background: "#111",
      color: "var(--angsql-white)"
    }).then((result) => {
      if (result.isConfirmed) {
        this.httpService.post({
          url: `${SERVER_HOST}/api/connections/disconnect`,
          type: this.data,
          body: undefined
        }).subscribe(res => {
          const response = res as Root['connectionsInterfaces'];
          if (response.error) {
            return alerts.default.fire({
              title: 'Error',
              text: "Something went wrong",
              icon: 'error',
              background: "#111",
              timer: 2000,
              color: "var(--angsql-white)"
            })
          }
          return alerts.default.fire({
            title: 'Success',
            text: "Successfully disconnected",
            icon:'success',
            background: "#111",
            timer: 2000,
          }).then(() => {
            sessionStorage.removeItem('connection');
            window.location.href = "/"
          })
        })
      }
    })
  }

  geData(): void {
    const data: TokenData = {
      token: this.token
      // key: this.key
    }

    this.httpService.post({
      url: `${SERVER_HOST}/api/auth/decode`,
      type: data,
      body: data
    }).subscribe(res => {
      const response = res as Root['connectionsInterfaces'];
      if (response.error) {
        alerts.default.fire({
          title: 'Error',
          text: 'Something went wrong',
          icon: 'error',
          showConfirmButton: true,
          confirmButtonText: 'Ok',
          background: '#111',
          color: 'var(--angsql-white)',
          timer: 7500
        }).then(() => {
          window.sessionStorage.removeItem('connection');
          window.location.href = '/'
        })
      } else {
        this.data = response;
      }
    })
  }

  ngOnInit(): void {
    this.geData();
    this.detectChanges()
    this.setLogs()
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
