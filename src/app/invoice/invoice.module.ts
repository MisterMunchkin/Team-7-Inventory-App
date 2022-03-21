import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceRoutingModule } from './invoice-routing.module';
import { InvoiceComponent } from './invoice.component';
import { MatIconModule } from '@angular/material/icon';
import { InvoiceFormDialogComponent } from './invoice-form-dialog/invoice-form-dialog.component';

var uiModules = [
  MatIconModule
]

@NgModule({
  declarations: [
    InvoiceComponent,
    InvoiceFormDialogComponent
  ],
  imports: [
    CommonModule,
    InvoiceRoutingModule,
    uiModules
  ]
})
export class InvoiceModule { }
