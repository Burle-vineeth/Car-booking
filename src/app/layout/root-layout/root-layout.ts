import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../header/header';

@Component({
  selector: 'app-root-layout',
  imports: [Header, RouterOutlet],
  templateUrl: './root-layout.html',
  styleUrl: './root-layout.css',
})
export class RootLayout {}
