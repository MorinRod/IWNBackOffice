import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {Payment} from "../../models/payment";

@Component({
  selector: 'app-edit-payment-form',
  templateUrl: './edit-payment-form.component.html',
  styleUrls: ['./edit-payment-form.component.css']
})
export class EditPaymentFormComponent implements OnInit {


  @Input() payment: Payment;

  @Output() savePayment: EventEmitter<Payment> = new EventEmitter<Payment>();

  constructor() {
  }

  requestSavePayment() {
    this.payment.isEdited = false;
    this.savePayment.emit(this.payment);   
  }


  revertChanges(){
        this.payment.isEdited = false;
  }

  ngOnInit() {
  }

}
