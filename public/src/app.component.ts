/**
 * Created by ranwahle on 07/09/2016.
 */
import { Component } from '@angular/core';
import {Store} from "./app.store";
import {UsersActions} from "./actions/users.actions";

@Component({
  template: ` <h1 class="title">שדולת הנשים </h1>
 <span *ngIf="_store.state.currentUser && _store.state.currentUser.length 
  &&  _store.state.currentUser[0]">
 
   שלום   {{_store.state.currentUser[0].name}}
</span>

  <nav>
    <a *ngIf="isLogedIn " [routerLink]="['/contacts-screen']">Contacts</a>
    <a *ngIf="!isLogedIn" [routerLink]="['/register']">Register</a>
    <a *ngIf= "isLogedIn" href="javascript:void(0)" (click)="userActions.logOut()">Log out</a>
  </nav>
  <spinner *ngIf="_store.state.OnServerCall.loading"></spinner>
  <router-outlet></router-outlet>`,
  selector: 'my-app'

})
export class AppComponent  {
  private _store: Store;
  private userActions:UsersActions;

  get isLogedIn():boolean{
    return this._store.state.currentUser &&  this._store.state.currentUser.length
     && this._store.state.currentUser[this._store.state.currentUser.length - 1]
  }

  constructor (_store:Store, userActions:UsersActions){
    this._store = _store;
    this.userActions = userActions;

    this.userActions.getCurrnetUser();


  }
}
