import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule} from '@angular/http';
import { NgDatepickerModule } from 'ng2-datepicker';


import { AppComponent } from './app.component';
import { DisplayComponent } from './app.displayhtml';

@NgModule({
  declarations: [
    AppComponent,
    DisplayComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    NgDatepickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
