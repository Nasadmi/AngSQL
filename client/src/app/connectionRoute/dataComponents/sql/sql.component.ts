import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import * as CodeMirror from 'codemirror';
import 'codemirror/mode/sql/sql';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-sql',
  templateUrl: './sql.component.html',
  styleUrls: ['./sql.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class SqlComponent {
  @ViewChild('CodeMirror') codeMirror: unknown;
  sqlFormControl: FormControl = new FormControl('SELECT * FROM users;');
  cmOptions: CodeMirror.EditorConfiguration = {
    mode: 'text/x-sql',
    theme: 'material-ocean',
    lineNumbers: true,
    lineWrapping: true,
    tabSize: 4,
    indentUnit: 4
  }
  constructor() {
    this.sqlFormControl.valueChanges.subscribe(value => {
      console.log(value);
    });
  }
}
