import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pagingPipe'
})
export class PagingPipePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
