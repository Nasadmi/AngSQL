import { Component, Input } from '@angular/core';
import { SERVER_HOST } from 'src/consts';

import { Connections } from 'src/models/connections.model';

import { HttpService } from 'src/services/http.service';

import * as alerts from "sweetalert2"

@Component({
  selector: 'app-connections-list',
  templateUrl: './connections-list.component.html',
  styleUrls: ['./connections-list.component.css']
})
export class ConnectionsListComponent {
  @Input() connections!: Connections;
  constructor(private httpService: HttpService) { }
  deleteConnection({
    host,
    port,
    user,
    database
  }: Connections ) {
    alerts.default.fire({
      title: 'Are you sure?',
      text: "If you want to delete this connection, please enter password.",
      input: 'password',
      icon: 'warning',
      showCancelButton: true,
      showConfirmButton: true,
      color: 'var(--angsql-white)',
      background: '#111'
    }).then((result) => {
      if (result.isConfirmed) {
        const data: Connections = {
          host, port, user, database
        }
        this.httpService.post({
          url: `${SERVER_HOST}/api/connections/delete`,
          type: data,
          body: {
            host: data.host,
            port: data.port,
            user: data.user,
            database: data.database,
            password: result.value
          }
        }).subscribe((res) => {
            const response = res as Connections;
            if (response.message === false) {
              return alerts.default.fire({
                icon: 'error',
                title: 'Error',
                text: 'Something went wrong. Please try again later.',
                color: 'var(--angsql-white)',
                background: '#111'
              })
            } 
            if (response.message === 'Password') {
              return alerts.default.fire({
                icon: 'error',
                title: 'Error',
                text: 'Incorrect password.',
                color: 'var(--angsql-white)',
                background: '#111'
              })
            }
            return alerts.default.fire({
              icon: 'info',
              title: 'Connection has been deleted.',
              text: '',
              timer: 10000,
              showConfirmButton: true,
              color: 'var(--angsql-white)',
              background: '#111'
            }).then(() => {
              window.location.reload()
            })
        })
      }
    })
  }
}