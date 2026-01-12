import { MobileFormat } from '@/shared/directives/mobile-format';
import { Component, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Button } from '../button/button';

@Component({
  selector: 'app-login',
  imports: [Button, MobileFormat, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  public close = output();

  public form = new FormGroup({
    mobile: new FormControl('', [Validators.required]),
  });

  public onBack() {
    this.close.emit();
  }

  public getOTP() {}
}
