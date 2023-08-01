import { Component, OnInit } from '@angular/core';

import { HttpService } from 'src/services/http.service';

import { Root } from 'src/models/connections.model';

import { SERVER_HOST } from 'src/consts';

import { ShareService } from 'src/services/share.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'AngSQL';
  data!: Root['connections'] | null;
  colorChange: boolean = false;
  constructor(private httpService: HttpService, public shareService: ShareService) {}
  colorChangeHandler(): void {
    setInterval(() => {
      this.colorChange = !this.colorChange;
    }, 1500)
  }
  showAddComponentHandler() {
    this.shareService.variable = true;
  }

  getData(): void {
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

  ngOnInit(): void {
    this.getData()
    this.colorChangeHandler();
  }
}
