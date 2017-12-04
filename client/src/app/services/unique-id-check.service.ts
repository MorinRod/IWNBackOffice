import { Injectable } from '@angular/core';
import {configuration} from '../constants/configuration';
import {Http} from "@angular/http";
import {AuthHttp}  from 'angular2-jwt';			

@Injectable()
export class UniqueIdCheckService {
	private _http: Http;
    private url: string;

  constructor(_http: Http,private authHttp: AuthHttp) {
  	this._http=_http;
  	this.url=configuration.devUrl;

   }

   checkIdUniqueness(id:string){
   	if(id){

   	}
   	else
   		console.error('id is not legal')
   }

}
