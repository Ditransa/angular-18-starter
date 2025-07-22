import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({
  selector: '[appClickToOpenDatepicker]',
  standalone: true,
})
export class ClickToOpenDatepickerDirective {
  private el: ElementRef = inject(ElementRef);

  @HostListener('click')
  onClick() {
    // Si el elemento es un input de tipo date, lo mostramos directamente
    if (this.el.nativeElement.type === 'date') {
      this.el.nativeElement.showPicker();
    }
  }
}
