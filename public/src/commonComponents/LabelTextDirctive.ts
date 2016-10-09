import {Directive, ElementRef, Renderer, OnInit, OnChanges, SimpleChanges} from "@angular/core";
import {Input} from "@angular/core";
/**
 * Created by ranwahle on 09/10/2016.
 */

@Directive({
    selector: '[labelText]'
})
export class LabelTextDirctive implements OnInit  {


    private el: ElementRef;
    private label:any;
    @Input() labelText:string;
    ngOnInit(): void {
        this.label = document.createElement('label');

        this.label.innerText =  this.labelText;
        this.el.nativeElement.parentElement.insertBefore(this.label, this.el.nativeElement);
        window.setTimeout(() => this.label.setAttribute('for', this.el.nativeElement.id));
    }


    constructor(el: ElementRef, renderer: Renderer) {
        this.el = el;


    }
}