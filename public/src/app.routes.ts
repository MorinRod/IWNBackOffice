import { Routes, RouterModule } from '@angular/router';
import {ContactsListComponent} from "./components/contactsList.component";
import {ModuleWithProviders} from "@angular/core";
import {RegisterComponent} from "./components/auth/register.component";
import {WelcomeComponent} from "./components/WelcomeComponent";

const appRoutes: Routes = [
    {path: 'contacts-screen', component: ContactsListComponent },
    {path: 'register', component:RegisterComponent},
    {path: '', component: WelcomeComponent}

];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);


export class RoutesPaths{
    public  paths:string[];
    constructor(){
        this.paths = appRoutes.map(route => route.path);
    }
}