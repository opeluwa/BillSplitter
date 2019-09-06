import {Direct} from 'protractor/built/driverProviders';
import {Directive, ElementRef, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[appButtonDropDown]'
})

export class buttonDropDownDirective {
  @HostBinding('class.show') showDropdown;
  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    const el = ((<Element> event.target).className);

    if (el !== 'dropdown-toggle') {
      this.showDropdown = false;
    } else {
      this.showDropdown ? this.showDropdown = false : this.showDropdown = true;
    }

  }
  constructor(private elRef: ElementRef) {}
}
