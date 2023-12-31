import { Component, EventEmitter, Input, Output } from '@angular/core';

import { HttpService } from 'src/services/http.service';

import { SERVER_HOST, ALERT_STYLE } from 'src/consts';

import { Root } from 'src/models/connections.model';

import * as alert from "sweetalert2"

@Component({
  selector: 'app-add-connection',
  templateUrl: './add-connection.component.html',
  styleUrls: ['./add-connection.component.css']
})


export class AddConnectionComponent {
  @Input() show!: boolean;
  @Output() hide = new EventEmitter<boolean>();
  data: Root['connectionsInterfaces'] = {
    host: '',
    port: null,
    user: '',
    password: '',
    database: undefined
  }
  constructor(private httpService: HttpService) { }
  hideComponent() {
    this.hide.emit();
    console.log(this.show);
  }
  sendValues() {
    if (this.data.host === "" 
      || this.data.port === "" 
      || this.data.user === "" 
      || this.data.password === "") {
        return alert.default.fire({
          title: "Error",
          text: "All fields are required",
          icon: "warning",
          confirmButtonText: "Ok",
          background: ALERT_STYLE('var(--angsql-blueDark)', '').background,
          color: ALERT_STYLE('', 'var(--angsql-white)').color
        }) 
      }

    if (this.data.port === null) {
      return alert.default.fire({
        title: 'Error',
        text: 'Please enter a valid port number',
        icon: 'error',
        confirmButtonText: 'Ok',
        timer: 7500,
        background: ALERT_STYLE('var(--angsql-blueDark)', '').background,
        color: ALERT_STYLE('', 'var(--angsql-white)').color
      })
    }
    return this.httpService.post({
      url: `${SERVER_HOST}/api/connections/add`, 
      type: this.data as Root['connectionsInterfaces'], 
      body: this.data}).subscribe((res) => {
        const response = res as Root['connectionsInterfaces'];
        if (!response.message) {
          alert.default.fire({
            title: 'This connection already exists',
            text: '',
            icon:'info',
            confirmButtonText: 'Ok',
            timer: 7500,
            background: ALERT_STYLE('var(--angsql-blueDark)', '').background,
            color: ALERT_STYLE('', 'var(--angsql-white)').color
          })
        } else {
          alert.default.fire({
            title: 'Success',
            text: 'Connection added successfully',
            icon:'success',
            confirmButtonText: 'Ok',
            timer: 7500,
            background: ALERT_STYLE('var(--angsql-blueDark)', '').background,
            color: ALERT_STYLE('', 'var(--angsql-white)').color
          }).then(() => {
            this.hideComponent()
            window.location.reload()
          })
        }
    })
  }

  getValue(value: Root['connectionsInterfaces']) {
    this.data.host = value.host;
    this.data.port = !isNaN(value.port as number) ? parseInt(value.port as string) : null;
    this.data.user = value.user;
    this.data.password = value.password;
    this.data.database = value.database === undefined ? "": value.database;
    this.sendValues();
  }
}