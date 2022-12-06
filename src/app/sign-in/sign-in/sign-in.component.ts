import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import * as firebaseui from 'firebaseui';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit, OnDestroy {
  private ui!: firebaseui.auth.AuthUI;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private authService: AuthService
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

  private onSignInSuccessful(result: firebase.auth.Auth) {
    return false;
  }
}
