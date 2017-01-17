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
import {ContactsComponent} from "./components/contacts.component";
import {BooleanPipe} from "./pipes/booleanPipe";
import { MemberPaymentComponent } from './components/member-payment/member-payment.component';
import { EditPaymentFormComponent } from './components/edit-payment-form/edit-payment-form.component';
import { PagingPipePipe } from './pipes/paging-pipe.pipe';
import { SearchPipePipe } from './pipes/search-pipe.pipe';
import { HilightPipe } from './pipes/hilight.pipe';
import { OrderByPipe } from './pipes/order-by.pipe';
import { SortArrowDirective } from './directives/sort-arrow.directive';


@NgModule({
  declarations: [
    AppComponent,
    MembersListComponent,
    RegisterComponent,
    WelcomeComponent,
    SpinnerComponent,
    ContactComponent,
    ContactsComponent,
    BooleanPipe,
    EditContact,
    MemberPaymentComponent,
    EditPaymentFormComponent,
    PagingPipePipe,
    SearchPipePipe,
    HilightPipe,
    OrderByPipe,
    SortArrowDirective,
    SortArrowDirective
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
