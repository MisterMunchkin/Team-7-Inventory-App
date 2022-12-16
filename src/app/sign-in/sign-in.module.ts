import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignInRoutingModule } from './sign-in-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

const uiModules = [
  MatButtonModule,
  MatIconModule
]

@NgModule({
  declarations: [
    SignInComponent
  ],
  imports: [
    CommonModule,
    SignInRoutingModule,
    uiModules
  ]
})
export class SignInModule { }
