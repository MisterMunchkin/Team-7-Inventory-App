import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InventoryComponent } from './inventory/inventory.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InventoryFormDialogComponent } from './inventory/inventory-form-dialog/inventory-form-dialog.component';

var uiModules = [
  MatSidenavModule,
  MatIconModule,
  MatFormFieldModule,
  MatTableModule,
  MatButtonModule,
  MatDialogModule
]

@NgModule({
  declarations: [
    AppComponent,
    InventoryComponent,
    DashboardComponent,
    InventoryFormDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    uiModules
  ],
  exports: [
    uiModules
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
