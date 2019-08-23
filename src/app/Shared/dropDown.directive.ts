import {Directive, ElementRef, HostBinding, HostListener, Renderer2} from '@angular/core';

@Directive({
  selector: '[appDropDown]'
})

export class DropDownDirective {
  @HostBinding('class.open') openDown = false;  // normally set to false so it is closed
  @HostListener('document:click', ['$event']) clicked(eventdata: Event) {
    console.log(this.openDown);
    this.openDown =  this.elRef.nativeElement.contains(eventdata.target) ? !this.openDown : false;    // if the document (not the button) is clicked then close dropdown
  }

  constructor(private render: Renderer2, private elRef: ElementRef) {}
}
