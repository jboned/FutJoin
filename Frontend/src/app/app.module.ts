//Angular basics.
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

//Angular material
import {MaterialModule } from './_helpers/material-module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ToastrModule } from 'ngx-toastr';

//Http y routing
import {HttpClientModule} from '@angular/common/http';
import {routing, appRoutingProviders} from './app.routing';

//Componentes
import { AppComponent } from './app.component';
import {MustMatchDirective} from './_helpers/must-match.directive'
import { UserEditComponent } from './components/user-edit.component';



@NgModule({
  declarations: [
    AppComponent,
    MustMatchDirective,
    UserEditComponent
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
    routing
  ],
  providers: [ appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
