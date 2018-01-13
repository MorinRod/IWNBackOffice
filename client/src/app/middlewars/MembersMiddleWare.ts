import {Injectable} from "@angular/core";
import {Server, Members, Users} from '../constants/actions';
import {configuration} from '../constants/configuration';
import {Http} from "@angular/http";
import {HttpClient} from "@angular/common/http"
import {Member} from "../models/Member";



/**
 * Created by ranwahle on 07/09/2016.
 */
@Injectable()
export class MembersMiddleware {


  private _http: HttpClient;
  private url: string;

  constructor(_http: HttpClient) {
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

    let self = this;
    const successHandler = result => {
      store.dispatch({type: Server.DismissServerCall});
      console.log('contacts result', result);
      result.forEach(contact => {
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
        payload: result
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

    this._http.get(this.url+'/contacts').subscribe(successHandler, errorHandler);
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
      const idCheckSuccessHandler = result =>{
        if(result){ //if contact id number already exists
          store.dispatch({type: Members.GetMembers});
          return next({
            type: Members.ErrorMessageAdded,
            payload: "Id Number Already Exists In The System"
          });
        }
        else{ //contact id number doesn't exisis

          const addContactSuccessHandler = result => {
            let newPayload = this.setChangedMember(store,action.payload, result);
            return next({type: Members.GetMembers, payload: newPayload});

          };

          const addContactErrorHandler = error => next({
            type: Members.LoadingError,
            payload: error
          });

          this._http.post(this.url+'/contacts', action.payload)
            .subscribe(addContactSuccessHandler, addContactErrorHandler);
        }
      };

      const idCheckErrorHandler = error => next =>({
        type: Members.LoadingError,
        payload: error
      });

      this._http.get(`${this.url}/contacts/IdUniqueCheck/${action.payload.idNumber}`)
        .subscribe(idCheckSuccessHandler,idCheckErrorHandler);

    }

    else if (action.type === Members.DeleteMember) {
      console.log('payload', action.payload);
      const deleteMemberSuccessHandler = result => {
        return this.getContacts(store, next);
      };

      const errorHandler = error => next({
        type: Members.LoadingError,
        payload: error
      });  
      this._http.delete(`${this.url}/contacts/${action.payload.key}/${action.payload.idNumber}`, action.payload).subscribe(deleteMemberSuccessHandler, errorHandler);


    }


    else {
      return next(action);
    }
  }


}
