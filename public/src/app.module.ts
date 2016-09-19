/**
 * Created by ranwahle on 07/09/2016.
 */
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {AppComponent} from "./app.component";
import {ContactsListComponent} from "./components/contactsList.component";
import {Store} from "./app.store";
import {APP_ACTIONS} from "./actions/app.actions";
import {APP_Middlewars} from "./middlewars/app.middlewars";
import {HttpModule, Http} from "@angular/http";
import {FormsModule} from "@angular/forms";
import {EditContact} from "./components/EditContact";
import {ContactComponent} from "./components/ContactComponent";
import {routing} from "./app.routes";
import {RegisterComponent} from "./components/auth/register.component";
import {BooleanPipe} from "./pipes/booleanPipe";
import {WelcomeComponent} from "./components/WelcomeComponent";
import {SpinnerComponent} from "./components/Spinner";

@NgModule({
    imports:      [ BrowserModule, HttpModule, FormsModule, routing ],
    declarations: [ AppComponent, WelcomeComponent, ContactsListComponent, EditContact,
        ContactComponent,RegisterComponent, BooleanPipe, SpinnerComponent],
    bootstrap:    [ AppComponent ],
    providers: [Store, ...APP_ACTIONS, ...APP_Middlewars]

})
export class AppModule { }
