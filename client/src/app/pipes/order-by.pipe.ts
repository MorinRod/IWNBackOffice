import {Pipe, PipeTransform} from '@angular/core';


function compare(item1, item2, isDecending: boolean) {
  let result: number;
  if (item1 === item2) {
    result = 0;
  }
  else if (!item1 && item2) {
    result = -1;
  }
  else if (item1 && !item2) {
    result = 1;
  }
  else result = item1 > item2 ? 1 : -1;

  return (!isDecending) ? result : (-1) * result;
}

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(array: any[], keyWords: string[]): any {
    let copy = Object.assign([], array);
    keyWords.forEach(keyWord => {
      if (!keyWord) {
        return;
      }
      if (keyWord.startsWith('-')) {
        keyWord = keyWord.substr(1);
        copy = copy.sort((a1, a2) => compare(a1[keyWord], a2[keyWord], false));

      }
      else {
        copy = copy.sort((a1, a2) => compare(a1[keyWord], a2[keyWord], true));
      }
    });

    return copy;
  }

}
