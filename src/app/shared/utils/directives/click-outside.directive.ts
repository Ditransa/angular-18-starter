/**
 * Description
 * @param {any} {selector:'[clickOutside]'
 * @param {any} standalone:true}
 * @returns {any}
 */
import { Directive, ElementRef, EventEmitter, HostListener, inject, Output } from '@angular/core';
// ... existing code ...
@Directive({
  selector: '[appClickOutside]',
  standalone: true,
})
export class ClickOutsideDirective {
  // eslint-disable-next-line @angular-eslint/no-output-rename
  @Output('appClickOutside') appClickOutside = new EventEmitter<void>();

  private elementRef: ElementRef = inject(ElementRef);

  @HostListener('document:click', ['$event.target'])
  onClick(targetElement: HTMLElement) {
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.appClickOutside.emit();
    }
  }
}
