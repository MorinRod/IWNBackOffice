import {Injectable} from "@angular/core";
import {Contacts} from '../constants/actions';
import {Http} from "@angular/http";


/**
 * Created by ranwahle on 07/09/2016.
 */
@Injectable()
export class ContactsMiddleWare {

    private _http: Http;
    private url: string;

    constructor(_http: Http) {
        this._http = _http;
        this.url = 'http://localhost:5000/contacts';
    }

    middleware = store => next => action => {
        if (action.type === Contacts.GetContacts) {


            const successHandler = result => next({
                type   : Contacts.Loaded,
                payload: result.json()
            });

            const errorHandler = error => next({
                type   : Contacts.LoadingError,
                payload: error.json()
            });

            this._http.get(this.url).subscribe(successHandler, errorHandler);


            // return next({
            //     type: Contacts.Loaded,
            //     payload: [
            //         {
            //             firstName: 'Ran',
            //             lastName: 'Wahle',
            //             eMail: 'ran.wahle@gmail.com',
            //
            //         }
            //
            //     ]
            // });
        }

        else {
            return next(action);
        }
    }

    // getContacts(){
    //     let contacts = [
    //         {firstName: 'Ran',
    //             lastName: 'Wahle',
    //             eMail: 'ran.wahle@gmail.com',
    //
    //         }
    //
    //     ];
    //
    //    return contacts;
    //
    // }


}