import { BookRide } from '@/shared/components/book-ride/book-ride';
import { Component } from '@angular/core';
import { Header } from '../header/header';

@Component({
  selector: 'app-home',
  imports: [Header, BookRide],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
