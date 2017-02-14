import {Component, OnInit} from '@angular/core';
import {Store} from "../../app.store";
import {MembersActions} from "../../actions/members.actions";
import {ActivatedRoute} from "@angular/router";
import {Payment} from "../../models/payment";

@Component({
  selector: 'app-member-payment',
  templateUrl: './member-payment.component.html',
  styleUrls: ['./member-payment.component.css']
})
export class MemberPaymentComponent implements OnInit {

  private memberId: string;
  private routerSubscription: any;
  private newPayment: Payment;

  constructor(private _store: Store, private memberActions: MembersActions, private route: ActivatedRoute) {

  }

  getPayments() {
    this.memberActions.getPayment(this.memberId);
  }

  editPayment(payment: Payment){
      payment.isEdited = true;
  }


  addNewPayment() {
    this.newPayment = new Payment();
    this.newPayment.memberId = this.memberId;
  }

  savePayment(payment: Payment) {
    console.debug('saving payment', payment);
      this.memberActions.savePayment(payment);
  }

  ngOnInit() {

    this.routerSubscription = this.route.params.subscribe(param => {
      this.memberId = param['id'];
      this.getPayments();

    });


  }

}
