import { Component } from '@angular/core';
import {UsersActions} from "./actions/users.actions";
import {Store} from "./app.store";
import {Auth} from "./components/auth/auth.service";
import { Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[Auth]
})
export class AppComponent  {
  private _store: Store;
  private userActions:UsersActions;

  get isLogedIn():boolean{

    return true;
    // return this._store.state.currentUser &&  this._store.state.currentUser.length
    //   && this._store.state.currentUser[this._store.state.currentUser.length - 1]
  }

  constructor (_store:Store, userActions:UsersActions,private auth: Auth,private authHttp: AuthHttp){
    this._store = _store;
    this.userActions = userActions;
    this.userActions.getCurrnetUser();


  }
}
