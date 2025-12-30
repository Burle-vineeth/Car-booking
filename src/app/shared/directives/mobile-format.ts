import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appMobileFormat]',
})
export class MobileFormat {
  constructor(private el: ElementRef<HTMLInputElement>) {}

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const input = this.el.nativeElement;

    // Remove non-digits
    let value = input.value.replace(/\D/g, '');

    // Limit to 10 digits
    value = value.slice(0, 10);

    // Add space after 5 digits
    if (value.length > 5) {
      value = value.slice(0, 5) + ' ' + value.slice(5);
    }

    input.value = value;
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (['e', 'E', '+', '-', '.'].includes(event.key)) {
      event.preventDefault();
    }
  }
}
