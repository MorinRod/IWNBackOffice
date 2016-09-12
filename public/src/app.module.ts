/**
 * Created by ranwahle on 07/09/2016.
 */
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {AppComponent} from "./app.component";
import {ContactsListCompoenent} from "./components/contactsList.component";
import {Store} from "./app.store";
import {APP_ACTIONS} from "./actions/app.actions";
import {APP_Middlewars} from "./middlewars/app.middlewars";
import {HttpModule, Http} from "@angular/http";
import {FormsModule} from "@angular/forms";
import {EditContact} from "./components/EditContact";
import {ContactComponent} from "./components/ContactComponent";

@NgModule({
    imports:      [ BrowserModule, HttpModule, FormsModule ],
    declarations: [ AppComponent, ContactsListCompoenent, EditContact,ContactComponent ],
    bootstrap:    [ AppComponent ],
    providers: [Store, ...APP_ACTIONS, ...APP_Middlewars]
})
export class AppModule { }
