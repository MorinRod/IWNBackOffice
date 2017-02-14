import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'pagingPipe'
})
export class PagingPipePipe implements PipeTransform {

  transform(collection: any[], from: number, to: number): any[] {
    return collection.slice(from, to);
  }

}
