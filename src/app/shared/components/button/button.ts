import { Component, input, output } from '@angular/core';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';
type ButtonType = 'button' | 'submit' | 'reset';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
  public variant = input<ButtonVariant>('primary');
  public size = input<ButtonSize>('md');
  public disabled = input<boolean>(false);
  public loading = input<boolean>(false);
  public fullWidth = input<boolean>(false);
  public type = input<ButtonType>('button');
  public handleClick = output();

  get classes(): string {
    return [
      'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition',
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 mx-auto',
      this.sizeClass,
      this.variantClass,
      this.fullWidth() ? 'w-[90%] md:w-[80%]' : '',
      this.disabled() || this.loading() ? 'opacity-60 cursor-no-drop' : 'cursor-pointer',
    ].join(' ');
  }

  public buttonClick() {
    this.handleClick.emit();
  }

  private get sizeClass() {
    switch (this.size()) {
      case 'sm':
        return 'h-8 px-3 text-sm';
      case 'lg':
        return 'h-12 px-6 text-base';
      default:
        return 'h-10 px-4 text-sm';
    }
  }

  private get variantClass() {
    switch (this.variant()) {
      case 'secondary':
        return 'bg-(--bg-elevated) text-(--text-primary) border border-(--border) hover:bg-(--bg-hover)';
      case 'outline':
        return 'bg-transparent border border-(--border) text-(--text-primary) hover:bg-(--bg-hover)';
      case 'ghost':
        return 'bg-transparent text-(--text-primary) hover:bg-(--bg-hover)';
      case 'danger':
        return 'bg-(--danger) text-white hover:opacity-90 focus-visible:ring-(--danger)';
      default:
        return 'bg-(--primary) text-white hover:opacity-90 focus-visible:ring-(--primary)';
    }
  }
}
