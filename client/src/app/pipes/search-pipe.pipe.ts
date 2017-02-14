import { Pipe, PipeTransform } from '@angular/core';
import {Member} from "../models/Member";

@Pipe({
  name: 'searchPipe'
})
export class SearchPipePipe implements PipeTransform {

  transform(collection: Member[], searchWord: string): any {
      if (!searchWord) {
        return collection;
      }

      return collection.filter(member =>  {

        return member.address && member.address.indexOf(searchWord) !== -1
        ||
        member.city && member.city.indexOf(searchWord) !== -1 ||
        member.emailAddress && member.emailAddress.toLowerCase().indexOf(searchWord.toLowerCase()) !== -1 ||
        member.firstName && member.firstName.indexOf(searchWord) !== -1 ||
        member.idNumber && member.idNumber.indexOf(searchWord) !== -1 ||
        member.lastName && member.lastName.indexOf(searchWord) !== -1
      });
  }

}
