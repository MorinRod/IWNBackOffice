import {Injectable} from "@angular/core";
import {Server, Members, Users} from '../constants/actions';
import {Http} from "@angular/http";


/**
 * Created by ranwahle on 07/09/2016.
 */
@Injectable()
export class MembersMiddleware {

    private _http: Http;
    private url: string;


    constructor(_http: Http) {
        this._http = _http;
        this.url =  'http://iwndataservices20161217050028.azurewebsites.net/api/members';
      //  'http://10.0.0.6/IWNDataServices/api/members';
          //'http://iwndataservices20161217050028.azurewebsites.net/api/members';

    }

    setChangedMember(store, savedMember){
        savedMember.isEdited = false;
        let members = store.getState().members;
        let changedMember = members.find(member => member.key === savedMember.key
       );

        if (!changedMember ){
            members.push(savedMember);
        }
        else{
            members[members.indexOf(changedMember)]  = savedMember;
        }

        return members;
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
                  type: Members.Loaded,
                  payload: results
              });
          };

          const errorHandler = error => {

              console.log('error', error);
              store.dispatch({type:Server.DismissServerCall});

              if (error.status === 401){
                  store.dispatch({type: Users.LogOut});
              }
              return next({
                  type: Members.LoadingError,
                 payload: error.status
              });
          }

          this._http.get(this.url).subscribe(successHandler, errorHandler);
          return next({type: Server.OnServerCall});

      }

    middleware = store => next => action => {

        console.debug('members middleware action', action);
        if (action.type === Members.GetMembers) {
           return this.getContacts(store, next);

        }

        else if (action.type === Members.Loaded ||
            action.type === Members.LoadingError) {

        }

        else if (action.type === Members.SaveMember) {
            const addContactSuccessHandler = result => {
                let newPayload = this.setChangedMember(store, action.payload);
               return next({type: Members.Loaded, payload: newPayload});

            };

            const errorHandler = error => next({
                type: Members.LoadingError,
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
