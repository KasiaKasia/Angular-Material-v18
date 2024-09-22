import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appCommaToDot]',
  standalone: true
})
export class CommaToDotDirective {

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInputChange(event: Event): void {
    const input = this.el.nativeElement as HTMLInputElement;
    const newValue = input.value.replace(/,/g, '.');
    if (input.value !== newValue) {
      input.value = newValue;
      input.dispatchEvent(new Event('input'));
    }
  }
}
