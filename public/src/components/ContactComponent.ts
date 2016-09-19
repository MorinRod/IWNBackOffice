/**
 * Created by ranwahle on 12/09/2016.
 */
import {Component, Input} from "@angular/core";
import {Contact} from "../models/Contact";
@Component({
    selector: 'contact-component',
    template: `<div class="col-xs-1">&nbsp;{{contact.firstName}}</div>
<div class="col-xs-1">&nbsp;{{contact.lastName}}</div>
<div class="col-xs-2">&nbsp;{{contact.eMail}}</div>
<div class="col-xs-1 hidden-xs">&nbsp;{{contact.fromDate}}</div>
<div class="col-xs-1 hidden-xs" >&nbsp;{{contact.toDate}}</div>
<div class="col-xs-1 hidden-xs">&nbsp;{{contact.city}}</div>
<div class="col-xs-1 hidden-xs">&nbsp;{{contact.address}}</div>
<div class="col-xs-1 hidden-xs">&nbsp;{{contact.phoneNumber}}</div>
<div class="col-xs-1" [innerHTML]="contact.wantUpdates | booleanpipe"></div>
<div class="col-xs-1" [innerHTML]="contact.member | booleanpipe"></div>
`
})
export class ContactComponent{
    @Input() private contact:Contact;


}