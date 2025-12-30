import { MobileFormat } from '@/shared/directives/mobile-format';
import { Component, output } from '@angular/core';
import { Button } from '../button/button';

@Component({
  selector: 'app-login',
  imports: [Button, MobileFormat],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  public close = output();

  public onBack() {
    this.close.emit();
  }

  public getOTP() {}
}
