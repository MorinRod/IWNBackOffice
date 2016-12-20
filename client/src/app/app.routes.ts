import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from "@angular/core";
import {RegisterComponent} from "./components/auth/register.component";
import {WelcomeComponent} from "./components/WelcomeComponent";
import {MembersListComponent} from "./components/membersList.component";
import {MemberPaymentComponent} from "./components/member-payment/member-payment.component";

const appRoutes: Routes = [
  {path: 'members-screen', component: MembersListComponent},
  {path: 'login', component: RegisterComponent},
  {path: 'payment/:id', component: MemberPaymentComponent},
  {path: '', component: WelcomeComponent}

];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);


export class RoutesPaths {
  public paths: string[];

  constructor() {
    this.paths = appRoutes.map(route => route.path);
  }
}
