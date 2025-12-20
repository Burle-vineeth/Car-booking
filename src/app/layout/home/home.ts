import { Component } from '@angular/core';
import { Header } from '../header/header';
import { BookRide } from '@/shared/components/book-ride/book-ride';

@Component({
  selector: 'app-home',
  imports: [Header, BookRide],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
