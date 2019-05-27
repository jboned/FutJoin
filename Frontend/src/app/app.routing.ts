import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule}  from '@angular/router';

import { UserEditComponent}  from './components/user-edit/user-edit.component';
import { AppComponent } from './app.component';
import { CreateComplejoComponent } from './components/create-complejos/create-complejo.component';
import { ComplejosDeportivosComponent } from './components/complejos-deportivos/complejos-deportivos.component';
import { CamposComponent } from './components/campos/campos.component';
import { CreateCampoComponent } from './components/create-campos/create-campo.component';

const appRoutes: Routes = [
    {path: '', component: AppComponent},
    {path: 'undefined', component: ComplejosDeportivosComponent},
    {path: 'complejos', component: ComplejosDeportivosComponent},
    {path: 'complejos/campos/:complejo_id/:tipo', component: CamposComponent},
    {path: 'complejos/createcampo/:complejo_id/:tipo', component: CreateCampoComponent},
    {path: 'complejos/createcampo/:campo_id', component: CreateCampoComponent},
    {path: 'mis-datos', component: UserEditComponent},
    {path: 'crear-complejo', component: CreateComplejoComponent}
]

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
