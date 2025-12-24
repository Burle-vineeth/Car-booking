import { GeoPlace } from '@/core/types';
import { AutoCompleteInput } from '@/shared/components/auto-complete-input/auto-complete-input';
import { UIRoutes } from '@/shared/constants';
import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-ride',
  imports: [FormsModule, CommonModule, AutoCompleteInput],
  templateUrl: './book-ride.html',
  styleUrl: './book-ride.css',
})
export class BookRide implements OnDestroy {
  public drop = signal<GeoPlace | string>('');
  public pickup = signal<GeoPlace | string>('');

  public pickupError = signal<string | null>(null);
  public dropError = signal<string | null>(null);

  private dropTimer!: NodeJS.Timeout;
  private pickupTimer!: NodeJS.Timeout;
  private router = inject(Router);

  public onPickupSelect(place: GeoPlace) {
    this.pickup.set(place);
    this.pickupError.set(null);
  }

  public onDropSelect(place: GeoPlace) {
    this.drop.set(place);
    this.dropError.set(null);
  }

  public bookRide() {
    this.pickupError.set(null);
    this.dropError.set(null);

    let hasError = false;

    if (typeof this.pickup() === 'string') {
      this.pickupError.set('Please enter pickup location');
      hasError = true;
    }

    if (typeof this.drop() === 'string') {
      this.dropError.set('Please enter drop location');
      hasError = true;
    }

    if (hasError) {
      return;
    }

    const pickup = this.pickup() as GeoPlace;
    const drop = this.drop() as GeoPlace;

    this.router.navigate([`/${UIRoutes.RIDE_SUMMARY}`], {
      queryParams: {
        pickup: JSON.stringify(pickup),
        drop: JSON.stringify(drop),
      },
    });
  }

  ngOnDestroy() {
    clearTimeout(this.pickupTimer);
    clearTimeout(this.dropTimer);
  }
}
