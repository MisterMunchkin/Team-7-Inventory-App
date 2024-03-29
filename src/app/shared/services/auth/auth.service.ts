import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authorizedUsers: Array<string> = [
    'hanneh.hanami@gmail.com',
    'zidoniratatoy@gmail.com',
    'robindalmy@gmail.com',
    'team.se7en.org@gmail.com'
  ]

  private _user: firebase.User | null = null;
  get user() : firebase.User | null {
    return this._user;
  }
  set user(value: firebase.User | null) {
    this._user = value;
  }

  private _isAuthorized: boolean = false;
  get isAuthorized() : boolean {
    return this._isAuthorized;
  }
  set isAuthorized(value: boolean) {
    this._isAuthorized = value;
  }


  constructor(private auth: AngularFireAuth, private router: Router) {
    this.auth.authState.subscribe(user => {
      this._user = user;

      if (this._user) {
        //signed in
        if (this.authorizedUsers.includes(this._user.email as string) === true) {
          this._isAuthorized = true;
          this.router.navigate(['dashboard']);
        }
      }
    });
  }

  googleAuthLogin() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.auth.signOut();
  }
}
