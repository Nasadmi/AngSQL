import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConnectionsListComponent } from './connectionManageComponents/connections-list/connections-list.component';
import { AddConnectionComponent } from './connectionManageComponents/add-connection/add-connection.component';
import { EditConnectionComponent } from './connectionManageComponents/edit-connection/edit-connection.component';
import { IndexComponent } from './index-component/index-component.component';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './connectionRoute/homeComponent/home.component';
import { SqlComponent } from './connectionRoute/dataComponents/sql/sql.component';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ConnectionsListComponent,
    AddConnectionComponent,
    EditConnectionComponent,
    IndexComponent,
    HomeComponent,
    SqlComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    CodemirrorModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
