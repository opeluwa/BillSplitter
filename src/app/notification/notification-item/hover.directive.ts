import {AfterViewInit, Directive, ElementRef, HostListener, Renderer2, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[hoverItem]'
})
export class HoverDirective implements AfterViewInit{
  private orginalText: string;
  @HostListener('mouseenter') clicked(eventdata: Event) {

    this.render.setProperty(this.elRef.nativeElement,'innerHTML','(Click <br> for more info)');
  }

  @HostListener('mouseleave') leave(eventdata: Event) {
    this.render.setProperty(this.elRef.nativeElement,'innerHTML', this.orginalText);
  }
  constructor(private vcRef: ViewContainerRef, private render: Renderer2, private elRef: ElementRef) {}

  ngAfterViewInit() {
    this.orginalText = this.elRef.nativeElement.innerHTML;
  }
}
