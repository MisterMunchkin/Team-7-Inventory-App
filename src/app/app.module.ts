import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InventoryComponent } from './inventory/inventory.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InventoryFormDialogComponent } from './inventory/inventory-form-dialog/inventory-form-dialog.component';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { ConfirmationDialogComponent } from './shared/components/confirmation-dialog/confirmation-dialog.component';
import { MatTooltipModule } from '@angular/material/tooltip';

var uiModules = [
  MatSidenavModule,
  MatIconModule,
  MatFormFieldModule,
  MatTableModule,
  MatButtonModule,
  MatDialogModule,
  MatSlideToggleModule,
  MatOptionModule,
  MatInputModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatTooltipModule
]

@NgModule({
  declarations: [
    AppComponent,
    InventoryComponent,
    DashboardComponent,
    InventoryFormDialogComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    uiModules
  ],
  exports: [
    uiModules
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
