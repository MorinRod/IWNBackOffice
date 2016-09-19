/**
 * Created by ranwahle on 13/09/2016.
 */

import {Pipe, PipeTransform} from "@angular/core";
@Pipe({name: 'booleanpipe'

})

export class BooleanPipe implements PipeTransform{
    transform(value: boolean, trueString = '<span class="glyphicon glyphicon-ok">&nbsp;</span>'
    , falseString = '<span class="glyphicon glyphicon-remove">&nbsp;</span>'): any {
        return value ? trueString : falseString;
    }

}