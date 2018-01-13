import {Action} from 'redux';
import {Members} from '../constants/actions';
import {Payment} from '../models/payment';

export class GetPayments implements Action {
  readonly type = Members.GetPayments;
  public payload: any;
  constructor(memberId: string) {
    this.payload = {memberId: memberId};
  }
}


export class SavePayment implements Action {
  readonly type = Members.SavePayment;

  constructor(public payload: Payment) {
  }

}

