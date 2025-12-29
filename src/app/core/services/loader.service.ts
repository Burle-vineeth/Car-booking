import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface LoaderPayload {
  show: boolean;
  text: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private _loader = new BehaviorSubject<LoaderPayload>({
    show: false,
    text: '',
  });

  public loader$ = this._loader.asObservable();

  public show(text: string) {
    this._loader.next({ show: true, text });
  }

  public hide() {
    this._loader.next({ show: false, text: '' });
  }
}
