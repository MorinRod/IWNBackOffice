import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {routing} from "./app.routes";
import {MembersListComponent} from "./components/membersList.component";
import {RegisterComponent} from "./components/auth/register.component";
import {WelcomeComponent} from "./components/WelcomeComponent";
import {SpinnerComponent} from "./components/Spinner";
import {ContactComponent} from "./components/ContactComponent";
import {CommonComponents} from "./commonComponents/commomComponents.module";
import {Store} from "./app.store";
import {APP_Middlewars} from "./middlewars/app.middlewars";
import {APP_ACTIONS} from "./actions/app.actions";
import {EditContact} from "./components/EditContact/EditContact";

@NgModule({
  declarations: [
    AppComponent,
    MembersListComponent,
    RegisterComponent,
    WelcomeComponent,
    SpinnerComponent,
    ContactComponent,
    EditContact
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    CommonComponents
  ],
  providers: [Store, ...APP_ACTIONS, ...APP_Middlewars],
  bootstrap: [AppComponent]
})
export class AppModule { }
