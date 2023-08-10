import { Component, OnInit } from '@angular/core';
import { Root, TokenData } from 'src/models/connections.model';
import { SERVER_HOST } from 'src/consts';
import { HttpService } from 'src/services/http.service';
import * as alerts from "sweetalert2"

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  token: string = JSON.parse(sessionStorage.getItem('connection') as string).token;

  constructor(private httpService: HttpService) { }

  async geData() {
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
      }
    })
  }

  ngOnInit(): void {
    this.geData();
  }
}
