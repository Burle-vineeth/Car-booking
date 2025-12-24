import { LoaderService } from '@/core/services/loader.service';
import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCarSide } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-loader',
  imports: [AsyncPipe, FontAwesomeModule],
  templateUrl: './loader.html',
  styleUrl: './loader.css',
})
export class Loader {
  private loaderService = inject(LoaderService);

  public loader$ = this.loaderService.loader$;
  public readonly faCarSide = faCarSide;
}
