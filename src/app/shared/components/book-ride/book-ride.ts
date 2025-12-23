import { GeoPlace } from '@/core/types';
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoCompleteInput } from '../auto-complete-input/auto-complete-input';

@Component({
  selector: 'app-book-ride',
  imports: [FormsModule, CommonModule, AutoCompleteInput],
  templateUrl: './book-ride.html',
  styleUrl: './book-ride.css',
})
export class BookRide implements OnDestroy {
  public drop = signal('');
  public pickup = signal('');

  private dropTimer!: NodeJS.Timeout;
  private pickupTimer!: NodeJS.Timeout;

  public onPickupSelect(place: GeoPlace) {
    this.pickup.set(place.formatted);
  }

  public onDropSelect(place: GeoPlace) {
    this.drop.set(place.formatted);
  }

  public bookRide() {}

  ngOnDestroy() {
    clearTimeout(this.pickupTimer);
    clearTimeout(this.dropTimer);
  }
}
