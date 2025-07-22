import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({
  selector: '[appClickToOpenTimepicker]',
  standalone: true,
})
export class ClickToOpenTimepickerDirective {
  private el: ElementRef = inject(ElementRef);

  @HostListener('click')
  onClick() {
    // Si el elemento es un input de tipo time, lo mostramos directamente
    if (this.el.nativeElement.type === 'time') {
      this.el.nativeElement.showPicker();
    }
  }
}
