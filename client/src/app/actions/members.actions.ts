/**
 * Created by ranwahle on 07/09/2016.
 */

import {Injectable} from "@angular/core";
import {Store} from "../app.store";
import {Members} from "../constants/actions";
import {Payment} from "../models/payment";
import {Member} from "../models/Member";
import {Action} from 'redux';
import {GetPayments, SavePayment} from './payment.actions';

export class GetMembers implements Action {
  readonly type = Members.GetMembers;
}

@Injectable()
export class MembersActions {
  private store: Store;

  constructor(store: Store) {
    this.store = store;
  }

  savePayment(payment: Payment) {
    this.store.dispatch(new SavePayment(payment));
  }

  getContacts() {
    this.store.dispatch(new GetMembers());
  }

  getPayment(memberId: string) {
    this.store.dispatch(new GetPayments(memberId));
  }

  saveContact(contact: Member) {
    this.store.dispatch({
      type: Members.SaveMember,
      payload: contact
    });
  }

  deleteMember(member) {
    this.store.dispatch({
      type: Members.DeleteMember,
      payload: member
    });
  }

  addContact(contact) {
    this.store.dispatch({
      type: Members.AddMember,
      payload: contact
    });
  }

  deleteErrorMsg() {
    this.store.dispatch({
      type: Members.ErrorMessageDeleted
    })
  }

}
