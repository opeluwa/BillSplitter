import {Directive, ElementRef, HostBinding, HostListener, Renderer2} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromApp from '../AppStore/app.reducer';
import * as fromSystem from './systemStore/system.reducer';
import * as systemAction from './systemStore/system.action';
@Directive({
  selector: '[appDropDown]'
})

export class DropDownDirective {
  constructor(private render: Renderer2, private elRef: ElementRef, private store: Store<fromApp.AppState>) {
    this.store.select('system').subscribe((data: fromSystem.State) => {
      this.openDown = data.headerCollapse;
    });
  }

  @HostBinding('class.collapse') openDown = true;  // normally set to false so it is closed
  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
      const el = ((<Element> event.target).className);
      if (el !== 'navbar-toggler-icon') {   // if the toggle button is not clicked
        this.store.dispatch(new systemAction.headerCollapseUpdate(true));
      }
  }
}
