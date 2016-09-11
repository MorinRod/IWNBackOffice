/**
 * Created by ranwahle on 07/09/2016.
 */
import { Component } from '@angular/core';
import {ContactsListCompoenent} from "./components/contactsList.component";
@Component({
    selector: 'my-app',

    template: `<h1>אנשי קשר שדולת הנשים</h1>
<contacts-list-component></contacts-list-component>
`
})
export class AppComponent { }
