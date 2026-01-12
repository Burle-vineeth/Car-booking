import { Directive, ElementRef, HostListener, forwardRef } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appMobileFormat]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => MobileFormat),
      multi: true,
    },
  ],
})
export class MobileFormat implements Validator {
  constructor(private el: ElementRef<HTMLInputElement>) {}

  @HostListener('input')
  onInput() {
    const input = this.el.nativeElement;

    let value = input.value.replace(/\D/g, '');
    value = value.slice(0, 10);

    if (value.length > 5) {
      value = value.slice(0, 5) + ' ' + value.slice(5);
    }

    input.value = value;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;

    const rawValue = control.value.replace(/\s/g, '');
    const mobileRegex = /^[6-9]\d{9}$/;

    if (!mobileRegex.test(rawValue)) {
      return { invalidMobile: true };
    }

    return null;
  }
}
