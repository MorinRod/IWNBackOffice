/**
 * Created by ranwahle on 13/09/2016.
 */


import {Component} from "@angular/core";
import {configuration} from "../../constants/configuration";
@Component({
    template: `
    <a href="{{baseUrl}}/auth/google" class="btn btn-danger"><span class="fa fa-google-plus"></span> Login With Google</a>
`
})

export class RegisterComponent{



  get baseUrl():string{
    return configuration.baseUrl;
  }
}
