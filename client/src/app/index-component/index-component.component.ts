import { Component, OnInit } from '@angular/core';

import { HttpService } from 'src/services/http.service';

import { Root } from 'src/models/connections.model';

import { SERVER_HOST } from 'src/consts';

@Component({
  selector: 'app-home-component',
  templateUrl: './index-component.component.html',
  styleUrls: ['./index-component.component.css']
})
export class IndexComponent implements OnInit {
  title = 'AngSQL';
  data!: Root['connections'] | null;
  colorChange: boolean = false;
  showAddComponent: boolean = false;
  constructor(private httpService: HttpService) {}
  colorChangeHandler(): void {
    setInterval(() => {
      this.colorChange = !this.colorChange;
    }, 1500)
  }
  showAddComponentHandler() {
    this.showAddComponent = true;
    console.log(this.showAddComponent);
  }

  hideAddComponent() {
    this.showAddComponent = false;
    console.log(this.showAddComponent);
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
