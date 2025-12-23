import { Component, signal, effect, inject, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AutoCompleteInput } from '../auto-complete-input/auto-complete-input';
import { GeoPlace } from '@/core/types';

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
