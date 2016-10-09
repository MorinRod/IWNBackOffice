import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {LabelTextDirctive} from "./LabelTextDirctive";

/**
 * Created by ranwahle on 09/10/2016.
 */

@NgModule({
    imports: [FormsModule],
    declarations: [LabelTextDirctive],
    exports: [LabelTextDirctive]
})
export class CommonComponents {

}