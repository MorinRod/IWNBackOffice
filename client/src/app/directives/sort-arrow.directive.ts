import {Directive, ElementRef, Input, OnInit} from '@angular/core';

@Directive({
  selector: '[appSortArrow]'
})
export class SortArrowDirective implements OnInit {


  private _currentKeyWord: string;
  @Input() appSortArrow;


  @Input() get currentKeyWord(): string {
    return this._currentKeyWord;
  }

  set currentKeyWord(value: string) {
    this._currentKeyWord = value;
    this.elementRef.nativeElement.classList.remove('glyphicon-arrow-up');
    this.elementRef.nativeElement.classList.remove('glyphicon-arrow-down');

    if (value && value.indexOf(this.appSortArrow) >= 0) {
      if (value.startsWith('-')) {
        this.elementRef.nativeElement.classList.add('glyphicon-arrow-down');

      } else {
        this.elementRef.nativeElement.classList.add('glyphicon-arrow-up');

      }
    }

  }


  constructor(private elementRef: ElementRef) {
  }

  ngOnInit() {
    this.elementRef.nativeElement.classList.add('glyphicon');
  }

}
