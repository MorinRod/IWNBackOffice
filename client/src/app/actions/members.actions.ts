/**
 * Created by ranwahle on 07/09/2016.
 */

import {Injectable} from "@angular/core";
import {Store} from "../app.store";
import {Members} from "../constants/actions";
import {Payment} from "../models/payment";
import {Member} from "../models/Member";

@Injectable()
export class MembersActions {
  private store: Store;

  constructor(store: Store) {
    this.store = store;
  }

  savePayment(payment: Payment){
    this.store.dispatch({
      type: Members.SavePayment,
      payload: payment
    });
  }

  getContacts() {
    this.store.dispatch({
      type: Members.GetMembers
    });
  }

  getPayment(memberId: string) {
    this.store.dispatch({
      type: Members.GetPayments,
      payload: {memberId: memberId}
    });
  }

  saveContact(contact) {
    this.store.dispatch({
      type: Members.SaveMember,
      payload: contact
    });
  }

  deleteMember(member: Member){
    this.store.dispatch({type: Members.DeleteMember,
      payload: member
    });
  }

  addContact(contact) {
    this.store.dispatch({
      type: Members.AddMember,
      payload: contact
    });
  }
}
