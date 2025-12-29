import { Directive, ElementRef, input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDivider]',
})
export class Divider {
  public padding = input('px-6 md:px-8');

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {}

  ngOnInit() {
    this.padding()
      .split(' ')
      .forEach((cls) => this.renderer.addClass(this.el.nativeElement, cls));

    const line = this.renderer.createElement('div');
    this.renderer.addClass(line, 'h-px');
    this.renderer.addClass(line, 'bg-(--border)');

    this.renderer.appendChild(this.el.nativeElement, line);
  }
}
