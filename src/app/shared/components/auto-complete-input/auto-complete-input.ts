import { GeoapifyService } from '@/core/services/geoapify.service';
import { GeoPlace } from '@/core/types';
import { CommonModule } from '@angular/common';
import { Component, effect, HostListener, inject, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-auto-complete-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auto-complete-input.html',
})
export class AutoCompleteInput {
  public value = signal('');
  public suggestions = signal<GeoPlace[]>([]);
  public dropdownOpen = signal(false);
  public loading = signal(false);

  public icon = input('📍');
  public minLength = input(2);
  public placeholder = input('');

  public select = output<GeoPlace>();
  public valueChange = output<string>();

  /** Tracks who changed the value */
  private changeSource = signal<'user' | 'selection'>('user');
  private geoapify = inject(GeoapifyService);
  private debounce?: ReturnType<typeof setTimeout>;

  public valueEffect = effect(() => {
    const text = this.value();

    if (this.changeSource() !== 'user') {
      return;
    }

    clearTimeout(this.debounce);

    if (text.length < this.minLength()) {
      this.suggestions.set([]);
      this.dropdownOpen.set(false);
      return;
    }

    this.debounce = setTimeout(async () => {
      try {
        this.loading.set(true);

        const res = await this.geoapify.getAutoCompletePlaces(text);
        this.suggestions.set(res);
        this.dropdownOpen.set(res.length > 0);
      } catch (error) {
      } finally {
        this.loading.set(false);
      }
    }, 500);
  });

  @HostListener('document:pointerdown', ['$event'])
  onOutsidePointerDown(event: PointerEvent) {
    const target = event.target as HTMLElement | null;
    if (!target?.closest('.autocomplete-wrapper')) {
      this.dropdownOpen.set(false);
    }
  }

  /** Only called on typing */
  public onUserInput(value: string) {
    this.changeSource.set('user');
    this.value.set(value);
    this.valueChange.emit(value);
  }

  public selectSuggestion(place: GeoPlace) {
    this.changeSource.set('selection');
    this.value.set(place.formatted);
    this.valueChange.emit(place.formatted);

    this.suggestions.set([]);
    this.dropdownOpen.set(false);

    this.select.emit(place);
  }

  public onFocus() {
    if (this.suggestions().length) {
      this.dropdownOpen.set(true);
    }
  }

  public onBlur() {
    queueMicrotask(() => this.dropdownOpen.set(false));
  }
}
