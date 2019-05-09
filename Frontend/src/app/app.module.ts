import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';

import {MaterialModule } from './material-module';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatFormFieldModule} from '@angular/material/form-field';

import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';

//import {routing, appRoutingProviders} from './app.routing';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    HttpClientModule,
    ToastrModule.forRoot(),
   // routing

  ],
  providers: [],//appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
