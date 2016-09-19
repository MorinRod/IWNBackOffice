import {Injectable} from "@angular/core";
import {Contacts, Server} from '../constants/actions';
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

    getContacts(store, next) {

        let self = this;
        const successHandler = result => {
            store.dispatch({type:Server.DismissServerCall});
            console.log('contacts result', result);
            let results = result.json();
            results.forEach(contact => {
                contact.isEdited = false;
                if (!contact.eMail) {
                    contact.eMail = contact.email;
                }
            });

            return next({
                type: Contacts.Loaded,
                payload: results
            });
        };

        const errorHandler = error => {

            store.dispatch({type:Server.DismissServerCall});
            return next({
                type: Contacts.LoadingError,
                payload: error.json()
            });
        }

        this._http.get(this.url).subscribe(successHandler, errorHandler);
        return next({type: Server.OnServerCall});

    }

    middleware = store => next => action => {
        if (action.type === Contacts.GetContacts) {


            return this.getContacts(store, next);


        }

        else if (action.type === Contacts.Loaded ||
            action.type === Contacts.LoadingError) {

        }

        else if (action.type === Contacts.AddContact) {
            const addContactSuccessHandler = result => {
                return this.getContacts(store, next);

            };

            const errorHandler = error => next({
                type: Contacts.LoadingError,
                payload: error.json()
            });

            this._http.post(this.url, action.payload)
                .subscribe(addContactSuccessHandler, errorHandler);
        }

        else {
            return next(action);
        }
    }


}