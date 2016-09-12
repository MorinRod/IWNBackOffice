/**
 * Created by ranwahle on 12/09/2016.
 */
import {Component, Input} from "@angular/core";
import {Contact} from "../models/Contact";
@Component({
    selector: 'contact-component',
    template: `<div class="col-xs-1">{{contact.firstName}}</div>
<div class="col-xs-1">{{contact.lastName}}</div>
<div class="col-xs-1">{{contact.idNumber}}</div>
<div class="col-xs-1">{{contact.email}}</div>`

})
export class ContactComponent{
    @Input() private contact:Contact;


}