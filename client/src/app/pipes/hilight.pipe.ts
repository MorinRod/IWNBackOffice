import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hilight'
})
export class HilightPipe implements PipeTransform {

  transform(origHtml: string, hilightString: string): string {
    if (!hilightString || !origHtml){
      return origHtml;
    }

    const result =  origHtml.replace(hilightString, '<span class="highlight" style="background-color:yellow;">' + hilightString + '</span>');
    console.debug('origHtml', origHtml, 'highlightString' , hilightString, 'result', result);
    return result;

  }

}
