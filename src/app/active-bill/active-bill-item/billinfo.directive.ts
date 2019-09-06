import {AfterViewInit, Directive, ElementRef, HostBinding, HostListener, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[billDirective]'
})

export class  BillinfoDirective implements AfterViewInit {
  @HostBinding('style.backgroundColor') backgroundColor = '#1d2731';
  private OGInnerText = '';
  @HostListener('mouseenter') hovered(event: Event) {

    this.render.setProperty(this.elRef.nativeElement, 'template', '<p align="center">(Click to see more infomation<br>and to mark as paid)</p> ');
    this.backgroundColor = '#35475a';
  }

  @HostListener('mouseleave') clicked(eventdata: Event) {
    this.render.setProperty(this.elRef.nativeElement, 'innerHTML',
      this.OGInnerText);   // if the document (not the button) is clicked then close dropdown
    this.backgroundColor = '#1d2731';
  }

  constructor(private render: Renderer2, private elRef: ElementRef) {
  }

  ngAfterViewInit() {
    this.OGInnerText = this.elRef.nativeElement.innerHTML;
  }

}
