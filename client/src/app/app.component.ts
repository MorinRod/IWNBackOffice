import { Component } from '@angular/core';
import {UsersActions} from "./actions/users.actions";
import {Store} from "./app.store";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
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
