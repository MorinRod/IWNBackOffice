/**
 * Created by ranwahle on 12/09/2016.
 */
import {Component, Input} from "@angular/core";
import {Member} from "../models/Member";
@Component({
  selector: 'contact-component',
  template: `
<!--<div class="col-xs-1  hidden-xs" [appHighlight]="hilightWord">&nbsp;{{index + 1}}</div>-->
<div class="col-xs-1" [innerHTML]="contact.firstName | hilight:hilightWord"></div>
<div class="col-xs-1" [innerHTML]="contact.lastName | hilight:hilightWord"></div>
<div class="col-xs-1"  [innerHTML]="contact.idNumber | hilight:hilightWord"></div>
<div class="col-xs-1 hidden-xs" [innerHTML]="contact.phoneNumber | hilight:hilightWord"></div>
<div class="col-xs-1 hidden-xs"  [innerHTML]="contact.city | hilight:hilightWord"></div>
<div class="col-xs-1 hidden-xs"  [innerHTML]="contact.address | hilight:hilightWord"></div>
<div class="col-xs-2" [innerHTML]="contact.emailAddress | hilight:hilightWord"></div>
<div class="col-xs-1 hidden-xs">&nbsp;{{contact.fromDate}}</div>
<div class="col-xs-1 hidden-xs" >&nbsp;{{contact.toDate}}</div>

<div class="col-xs-1"><a [routerLink]="['/payment', contact.memberId]">תשלומים</a></div>

<!--<div class="col-xs-1" [innerHTML]="contact.wantUpdates | booleanpipe"></div>-->
<!--<div class="col-xs-1" [innerHTML]="contact.member | booleanpipe"></div>-->
`
})
export class ContactComponent {
  @Input() private contact: Member;
  @Input() hilightWord: string;
  @Input() index: number;


}
