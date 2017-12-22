import { Component, OnInit, Input } from '@angular/core';
import { Store } from "../../app.store";
import {MembersActions} from "../../actions/members.actions";

@Component({
  selector: 'app-error-msg',
  templateUrl: './error-msg.component.html',
  styleUrls: ['./error-msg.component.css']
})
export class ErrorMsgComponent implements OnInit {

	private _store: Store;
  	constructor(_store:Store ) {
  		this._store=_store;
  	}

	ngOnInit() {
	}

	@Input() errorMsg: string

}
