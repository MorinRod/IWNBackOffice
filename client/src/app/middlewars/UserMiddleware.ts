import {Users} from "../constants/actions";
import {Http} from "@angular/http";
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {configuration} from '../constants/configuration';
import {HttpClient} from "@angular/common/http"

/**
 * Created by ranwahle on 14/09/2016.
 */
@Injectable()
export class UserMiddleware {

  private _http: HttpClient;
  private url: string;
  private _router: Router;
  private baseUrl: string;

  constructor(_http: HttpClient, _router: Router) {
    this.baseUrl = configuration.baseUrl,
      this._http = _http;
    this.url = `${this.baseUrl}/currentUser`;
    this._router = _router;

  }

  middleware = store => next => action => {
    if (action.type === Users.GetCurrentUser) {
      const successHandler = result => {

        return next({
          type: Users.CurrentUserLoaded,
          payload: result
        });
      };

      const errorHandler = error => next({
        type: Users.LoadingError,
        payload: null
      });
      this._http.get(this.url).subscribe(successHandler, errorHandler);
    }

    else if (action.type === Users.LogOut) {
      let self = this;
      const handler = result => {
        self._router.navigate(['/']);
        return next({
          type: Users.CurrentUserLoaded,
          payload: null
        })
      };
      this._http.get(this.baseUrl + '/logout').subscribe(handler, handler);
    }
    return next(action);
  };


}
