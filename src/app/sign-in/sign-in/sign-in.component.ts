import { Component } from '@angular/core';
import 'firebase/compat/auth';
import { AuthService } from '../../shared/services/auth/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  constructor(
    private authService: AuthService
  ) { }

  signIn() {
    this.authService.googleAuthLogin();
  }
}
