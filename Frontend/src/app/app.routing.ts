import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule}  from '@angular/router';

import { UserEditComponent }  from './components/user-edit/user-edit.component';
import { CreateComplejoComponent } from './components/create-complejos/create-complejo.component';
import { ComplejosDeportivosComponent } from './components/complejos-deportivos/complejos-deportivos.component';
import { CamposComponent } from './components/campos/campos.component';
import { CreateCampoComponent } from './components/create-campos/create-campo.component';
import { PartidosComponent } from './components/partidos/partidos.component';
import { CreatePartidoComponent } from './components/create-partido/create-partido.component';
import { FAQComponent } from './components/faq/faq.component';
import { homeComponent } from './components/home/home.component';
import { MisPartidosComponent } from './components/mis-partidos/mis-partidos';
import { UserInfo } from './components/user-info/user-info';

const appRoutes: Routes = [

    {path: 'home', component: homeComponent, pathMatch: 'full'},
    {path: 'complejos', component: ComplejosDeportivosComponent,pathMatch: 'full'},
    {path: 'complejos/campos', component: CamposComponent,pathMatch: 'full'},
    {path: 'complejos/createcampo', component: CreateCampoComponent},
    {path: 'mis-datos', component: UserEditComponent,pathMatch: 'full'},
    {path: 'crear-complejo', component: CreateComplejoComponent,pathMatch: 'full'},
    {path: 'complejos/campos/partidos', component:PartidosComponent,pathMatch: 'full'},
    {path: 'complejos/campos/create-partido', component:CreatePartidoComponent,pathMatch: 'full'},
    {path: 'faq', component: FAQComponent, pathMatch: 'full'},
    {path: 'mis-partidos', component: MisPartidosComponent, pathMatch: 'full'},
    {path: 'user', component: UserInfo, pathMatch: 'full'}
]

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
