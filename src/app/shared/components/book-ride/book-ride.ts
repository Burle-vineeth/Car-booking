import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-ride',
  imports: [FormsModule, CommonModule],
  templateUrl: './book-ride.html',
  styleUrl: './book-ride.css',
})
export class BookRide {
  public pickup = signal('');
  public drop = signal('');

  public bookRide() {
    if (!this.pickup() || !this.drop()) {
      alert('Please enter both pickup and drop locations');
      return;
    }
  }
}
