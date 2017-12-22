import {Injectable} from "@angular/core";
import {Server, Members, Users} from '../constants/actions';
import {configuration} from '../constants/configuration';
import {Http} from "@angular/http";
import {AuthHttp} from 'angular2-jwt';
import {Member} from "../models/Member";
//import { HttpClient, HttpParams } from '@angular/common/http';


/**
 * Created by ranwahle on 07/09/2016.
 */
@Injectable()
export class MembersMiddleware {


  private _http: Http;
  private url: string;

  constructor(_http: Http, private authHttp: AuthHttp) {
    this._http = _http;
    this.url = //'http://iwndataservices20161217050028.azurewebsites.net/api/members';// 'http://iwndataservices20161217050028.azurewebsites.net/api/members';
      //  'http://10.0.0.6/IWNDataServices/api/members';
      //'http://iwndataservices20161217050028.azurewebsites.net/api/members';
      configuration.devUrl;
  }


  setChangedMember(store, editedMember: Member, savedMember: Member) {
    savedMember.isEdited = false;
    let members = store.getState().members;

    let changedMember = members.find(member => member.memberId === savedMember.memberId
    );

    if (!editedMember.memberId || !changedMember) {
      members[members.indexOf(editedMember)] = savedMember;
    }
    else {
      members[members.indexOf(changedMember)] = savedMember;
    }
    return members;
  }

  getContacts(store, next) {

    const successHandler = result => {
      store.dispatch({type: Server.DismissServerCall});
      console.log('contacts result', result);
      let results = result.body !== '' ? result.json(): [];
      results.forEach(contact => {
        contact.isEdited = false;
        if (!contact.eMail) {
          contact.eMail = contact.email;
        }
        if (contact.firstName) {
          contact.firstName = contact.firstName.trim();
        }
        if (contact.lastName) {
          contact.lastName = contact.lastName.trim();
        }
      });

      return next({
        type: Members.Loaded,
        payload: results
      });
    };


    const errorHandler = error => {

      console.log('error', error);
      store.dispatch({type: Server.DismissServerCall});

      if (error.status === 401) {
        store.dispatch({type: Users.LogOut});
      }
      return next({
        type: Members.LoadingError,
        payload: error.status
      });
    }

    this.authHttp.get(this.url + '/contacts').subscribe(successHandler, errorHandler);
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
      console.log('check uniqness of id: ',action.payload);
      const idCheckSuccessHandler = result =>{
        if(result.text() === "true"){ //if contact id number already exists
          store.dispatch({type: Members.GetMembers});
          return next({
            type: Members.ErrorMessageAdded,
            payload: "Id Number Already Exists In The System"
          });
        }
        else{ //contact id number doesn't exisisconst addContactSuccessHandler = result => {
        //return this.getContacts(store, next);
         let newPayload = this.setChangedMember(store,action.payload, result.json());
         return next({type: Members.GetMembers, payload: newPayload});

        };

        const addContactErrorHandler = error => next({
          type: Members.LoadingError,
          payload: error.json()
        });


      this.authHttp.post(this.url + '/contacts', action.payload)
        .subscribe(addContactSuccessHandler, errorHandler);
          this.authHttp.post(this.url+'/contacts', action.payload)
          .subscribe(addContactSuccessHandler, addContactErrorHandler);
        }
      };

      const idCheckErrorHandler = error => next =>({
        type: Members.LoadingError,
        payload: error.json
      });

      this.authHttp.get(`${this.url}/contacts/IdUniqueCheck/${action.payload.idNumber}`)
      .subscribe(idCheckSuccessHandler,idCheckErrorHandler);

    }

    else if (action.type === Members.DeleteMember) {
      console.log('payload', action.payload);
      const deleteMemberSuccessHandler = result => {
        //return next({type: Members.Deleted, payload: action.payload});
        return this.getContacts(store, next);
      };

      const errorHandler = error => next({
        type: Members.LoadingError,
        payload: error.json()
      });
      // console.log("member id to delete is",action.payload.idNumber);
      this.authHttp.delete(`${this.url}/contacts/${action.payload.key}`, action.payload).subscribe(deleteMemberSuccessHandler, errorHandler);


    }


    else {
      return next(action);
    }
  }


}
