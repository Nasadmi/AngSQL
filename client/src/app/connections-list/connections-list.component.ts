import { Component, Input } from '@angular/core';

import { Connections } from 'src/models/connections.model';

@Component({
  selector: 'app-connections-list',
  templateUrl: './connections-list.component.html',
  styleUrls: ['./connections-list.component.css']
})
export class ConnectionsListComponent {
  @Input() connections!: Connections;
}
