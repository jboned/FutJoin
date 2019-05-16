import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {UserEditComponent} from './components/user-edit.component';
import { AppComponent } from './app.component';
import {CreateComplejoComponent} from './components/create-complejo.component';

const appRoutes: Routes = [
    {path: '', component: AppComponent},
    {path: 'mis-datos', component: UserEditComponent},
    {path: 'crear-complejo', component: CreateComplejoComponent}
]

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
