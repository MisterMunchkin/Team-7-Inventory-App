import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import * as firebaseui from 'firebaseui';
import { AuthService } from '../../shared/services/auth/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  private ui!: firebaseui.auth.AuthUI;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  signIn() {
    this.authService.GoogleAuthLogin();
  }
}
