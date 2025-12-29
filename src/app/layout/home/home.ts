import { BookRide } from '@/features/book-ride/book-ride/book-ride';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [BookRide],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
