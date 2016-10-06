import { Routes, RouterModule } from '@angular/router';
import {ModuleWithProviders} from "@angular/core";
import {RegisterComponent} from "./components/auth/register.component";
import {WelcomeComponent} from "./components/WelcomeComponent";
import {MembersListComponent} from "./components/membersList.component";

const appRoutes: Routes = [
    {path: 'members-screen', component: MembersListComponent },
    {path: 'login', component:RegisterComponent},
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