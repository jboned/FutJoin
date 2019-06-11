//Angular basics.
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule}  from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';



//Angular material
import {MaterialModule } from './_helpers/material-module';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule} from '@angular/material/form-field';
import { ToastrModule } from 'ngx-toastr';
import { NgxFloatButtonModule } from 'ngx-float-button';

//Http y routing
import { HttpClientModule } from '@angular/common/http';
import {routing, appRoutingProviders} from './app.routing';


//Componentes
import { AppComponent } from './app.component';
import { MustMatchDirective } from './_helpers/must-match.directive'
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { CreateComplejoComponent } from './components/create-complejos/create-complejo.component';
import { ComplejosDeportivosComponent } from './components/complejos-deportivos/complejos-deportivos.component';
import { NgxCarousel3dModule }  from 'ngx-carousel-3d';
import { CreateCampoComponent } from './components/create-campos/create-campo.component';
import { CamposComponent } from './components/campos/campos.component';
import { PartidosComponent } from './components/partidos/partidos.component';
import { CreatePartidoComponent } from './components/create-partido/create-partido.component'
import { UnirsePartidoComponent } from './components/unirse-a-partido/unirse-partido.component';
import { FAQComponent } from './components/faq/faq.component';
import { homeComponent } from './components/home/home.component';
import { MisPartidosComponent } from './components/mis-partidos/mis-partidos';
import { JugadoresComponent } from './components/jugadores/jugadores.component';
import { UserInfo } from './components/user-info/user-info';



@NgModule({
  declarations: [
    AppComponent,
    MustMatchDirective,
    UserEditComponent,
    CreateComplejoComponent,
    ComplejosDeportivosComponent,
    CamposComponent,
    CreateCampoComponent,
    PartidosComponent,
    CreatePartidoComponent,
    UnirsePartidoComponent,
    FAQComponent,
    homeComponent,
    MisPartidosComponent,
    JugadoresComponent,
    UserInfo
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
    NgxCarousel3dModule,
    NgxFloatButtonModule,
    routing
  ],
  providers: [ appRoutingProviders],
  bootstrap: [AppComponent],
  entryComponents: [CreatePartidoComponent,UnirsePartidoComponent,JugadoresComponent]
})
export class AppModule {
}
