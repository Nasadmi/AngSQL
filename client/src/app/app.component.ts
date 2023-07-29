import { Component, OnInit } from '@angular/core';

import { HttpService } from 'src/services/http.service';

import { Root } from 'src/models/connections.model';

import { SERVER_HOST } from 'src/consts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'AngSQL';
  data!: Root['connections'] | null;
  constructor(private httpService: HttpService) {}
  ngOnInit(): void {
    const url = `${SERVER_HOST}/api/connections/get`;
    this.httpService.get({ url, type: this.data as Root['connections'] })
    .subscribe((res): void => {
      this.data = res as Root['connections'];
      if (this.data.length > 0) {
        this.data
      } else {
        this.data = null;
      }
    })
  }
}
