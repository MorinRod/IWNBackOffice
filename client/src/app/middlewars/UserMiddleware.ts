import {Users} from "../constants/actions";
import {Http} from "@angular/http";
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
/**
 * Created by ranwahle on 14/09/2016.
 */
@Injectable()
export class UserMiddleware{

  private _http:Http;
  private url:string;
  private _router:Router;
  private baseUrl:string;

  constructor(_http:Http, _router:Router){
    this.baseUrl = 'http://localhost:5000',
      this._http = _http;
    this.url = this.baseUrl +  '/currentUser';
    this._router = _router;

  }
  middleware = store => next => action => {
    if (action.type === Users.GetCurrentUser){
      const successHandler = result => {

        console.log('current user result', result);
        let results = result.json();

        return next({
          type: Users.CurrentUserLoaded,
          payload: results
        });
      };

      const errorHandler = error => next({
        type   : Users.LoadingError,
        payload: null
      });
      this._http.get(this.url).subscribe(successHandler, errorHandler);
    }

    else if (action.type === Users.LogOut){
      let self = this;
      const handler = result => {
        self._router.navigate(['/']);
        return next ({
          type: Users.CurrentUserLoaded,
          payload: null
        })
      };
      this._http.get(this.baseUrl +  '/logout').subscribe(handler, handler);
    }
    return next(action);
  };


}
