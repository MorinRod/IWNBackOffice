/**
 * Created by ranwahle on 07/09/2016.
 */
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {AppComponent} from "./app.component";
import {Store} from "./app.store";
import {APP_ACTIONS} from "./actions/app.actions";
import {APP_Middlewars} from "./middlewars/app.middlewars";
import {HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";
import {EditContact} from "./components/EditContact";
import {ContactComponent} from "./components/ContactComponent";
import {routing} from "./app.routes";
import {RegisterComponent} from "./components/auth/register.component";
import {BooleanPipe} from "./pipes/booleanPipe";
import {WelcomeComponent} from "./components/WelcomeComponent";
import {SpinnerComponent} from "./components/Spinner";
import {MembersListComponent} from "./components/membersList.component";

@NgModule({
    imports:      [ BrowserModule, HttpModule, FormsModule, routing ],
    declarations: [ AppComponent, WelcomeComponent, MembersListComponent, EditContact,
        ContactComponent,RegisterComponent, BooleanPipe, SpinnerComponent],
    bootstrap:    [ AppComponent ],
    providers: [Store, ...APP_ACTIONS, ...APP_Middlewars]

})
export class AppModule { }
