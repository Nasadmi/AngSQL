import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { SERVER_HOST, ALERT_STYLE } from 'src/consts';

import { Root } from 'src/models/connections.model';

import { HttpService } from 'src/services/http.service';
import * as alert from "sweetalert2"

@Component({
  selector: 'app-edit-connection',
  templateUrl: './edit-connection.component.html',
  styleUrls: ['./edit-connection.component.css']
})
export class EditConnectionComponent implements OnInit {
  @Input() connection!: Root['connectionsInterfaces'];
  
  @Input() show!: boolean;

  @Output() hide = new EventEmitter<boolean>();

  data: Root['connectionsInterfaces'] = {
    user: '',
    host: '',
    port: null,
    database: undefined,
    password: ''
  }

  showDatabaseField: boolean = false;

  constructor(private httpService: HttpService) {}
  hideComponent() {
    this.hide.emit()
  }

  showDatabaseFieldHandler() {
    if (this.connection.database !== "") {
      this.showDatabaseField = !this.showDatabaseField;
    }
  }

  getData(values: Root['connectionsInterfaces']) {
    this.data.host = values.host
    this.data.port = !isNaN(values.port as number) ? parseInt(values.port as string) : null;
    this.data.user = values.user
    this.data.database = this.connection.database === "" ? undefined : values.database;
    this.data.password = values.password === "" ? undefined : values.password
    this.sendData()
  }

  sendData() {
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
    return alert.default.fire({
      title: 'Confirm',
      text: 'Are you sure? If you want to edit this connection, please enter password',
      icon: 'warning',
      input: 'password',
      showCancelButton: true,
      showConfirmButton: true,
      background: ALERT_STYLE('var(--angsql-blueDark)', '').background,
      color: ALERT_STYLE('', 'var(--angsql-white)').color
    }).then((result) => {
      if (!result.isConfirmed) return;
      this.data.passwordExample = result.value;
      console.log(this.data)
      this.httpService.post({
        url: `${SERVER_HOST}/api/connections/edit`,
        type: this.data,
        body: this.data
      }).subscribe(async (res) => {
        const response = res as Root['connectionsInterfaces']
        if (response.message === false) {
          return alert.default.fire({
            icon: 'error',
            title: 'Error',
            text: 'Something went wrong',
            timer: 10000,
            showConfirmButton: true,
            background: ALERT_STYLE('var(--angsql-black)', '').background,
            color: ALERT_STYLE('', 'var(--angsql-white)').color
          })
        }
        if (response.message === 'Password') {
          return alert.default.fire({
            icon: 'error',
            title: 'Error',
            text: 'Incorrect password',
            timer: 10000,
            showConfirmButton: true,
            background: ALERT_STYLE('var(--angsql-black)', '').background,
            color: ALERT_STYLE('', 'var(--angsql-white)').color
          })
        }
        return await alert.default.fire({
          icon: 'success',
          title: 'Success',
          text: 'Connection edited successfully',
          showConfirmButton: true,
          background: ALERT_STYLE('var(--angsql-black)', '').background,
          color: ALERT_STYLE('', 'var(--angsql-white)').color
        }).then(() => {
          window.location.reload();
        });
      })
    })
  }

  ngOnInit(): void {
    this.showDatabaseFieldHandler()
  }
}
