import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import * as firebaseui from 'firebaseui';
import { CookieService } from 'ngx-cookie-service';
import { AuthUser } from 'src/app/shared/models/user';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit, OnDestroy {
  private ui!: firebaseui.auth.AuthUI;
  private _isAuthenticated: boolean = false;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
    this.afAuth.app
    .then(app => {
      const uiConfig = {
        signInOptions: [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID
        ],
        callbacks: {
          signInSuccessWithAuthResult: this
          .onSignInSuccessful
          .bind(this)
        }
      };

      this.ui = new firebaseui.auth.AuthUI(app.auth());
      this.ui.start('#firebaseui-auth-container', uiConfig);

      this.ui.disableAutoSignIn();
    });
  }

  ngOnDestroy(): void {
    this.ui.delete();
  }

  get isAuthenticated() {
    return this._isAuthenticated;
  }

  private onSignInSuccessful(result: any) {
    this._isAuthenticated = true;
    const authUser = result.user as AuthUser;
    this.cookieService.set('authUser', JSON.stringify(authUser));
    this.router.navigate(['/dashboard']);

    return false;
  }
}
