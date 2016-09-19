import {Users} from "../constants/actions";
import {Http} from "@angular/http";
import {Injectable} from "@angular/core";
/**
 * Created by ranwahle on 14/09/2016.
 */
@Injectable()
export class UserMiddleware{

    private _http:Http;
    private url:string;

    constructor(_http:Http){
        this._http = _http;
        this.url = 'http://localhost:5000/currentUser';

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
            const handler = result => {
                return next ({
                    type: Users.CurrentUserLoaded,
                    payload: null
                })
            };
            this._http.get('http://localhost:5000/logout').subscribe(handler, handler);
        }
        return next(action);
    };


}