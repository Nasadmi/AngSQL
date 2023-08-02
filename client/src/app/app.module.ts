import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConnectionsListComponent } from './connections-list/connections-list.component';
import { AddConnectionComponent } from './add-connection/add-connection.component';
import { EditConnectionComponent } from './edit-connection/edit-connection.component';

@NgModule({
  declarations: [
    AppComponent,
    ConnectionsListComponent,
    AddConnectionComponent,
    EditConnectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
