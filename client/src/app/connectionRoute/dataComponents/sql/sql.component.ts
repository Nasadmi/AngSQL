import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import * as CodeMirror from 'codemirror';
import 'codemirror/mode/sql/sql';
import { FormControl } from '@angular/forms';
import { HttpService } from "src/services/http.service"
import { ShareService } from 'src/services/share.service';
import { SERVER_HOST } from 'src/consts';
import { Root } from 'src/models/connections.model';

@Component({
  selector: 'app-sql',
  templateUrl: './sql.component.html',
  styleUrls: ['./sql.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class SqlComponent {
  @ViewChild('CodeMirror') codeMirror: unknown;
  text: string = ""
  response!: {
    error: boolean,
    text: string
  }
  sqlFormControl: FormControl = new FormControl('');
  cmOptions: CodeMirror.EditorConfiguration = {
    mode: 'text/x-sql',
    theme: 'material-ocean',
    lineNumbers: true,
    lineWrapping: true,
    tabSize: 4,
    indentUnit: 4
  }
  constructor(private httpService: HttpService, private shareService: ShareService) {
    this.sqlFormControl.valueChanges.subscribe(value => {
      this.text = value
    });
  }
  sendData() {
    this.httpService.post({
      url: `${SERVER_HOST}/api/db/query`,
      type: this.text,
      body: {
        data: this.text
      }
    }).subscribe(res => {
      const response = res as Root['connectionsInterfaces']
      this.shareService.changeValue({
        change: true,
      })
      this.shareService.changeResponse({
        response: {
          error: response.error,
          message: response.message
        }
      })
    })
  }
}
