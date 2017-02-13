import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[appSortArrow]'
})
export class SortArrowDirective {
  @Input() appSortArrow: string;
  @Input() currentKeyWord: string;
  constructor() { }

}
