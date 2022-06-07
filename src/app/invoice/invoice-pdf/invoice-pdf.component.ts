import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { Invoice } from 'src/app/shared/models/invoice';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import cloneDeep from 'lodash.clonedeep';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-invoice-pdf',
  templateUrl: './invoice-pdf.component.html',
  styleUrls: ['./invoice-pdf.component.scss']
})
export class InvoicePdfComponent implements OnInit {
  invoiceData: Invoice;
  @ViewChild('invoice') invoiceHTML!: ElementRef;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Invoice
  ) {
    this.invoiceData = cloneDeep(data);
  }

  ngOnInit() {
  }

  downloadPDF() {
    var data = document.getElementById('invoice');

    if (data) {
      html2canvas(data)
      .then(canvas => {
        let pdf = new jsPDF('portrait', 'mm', 'a4');

        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, pdf.internal.pageSize.width, pdf.internal.pageSize.height);

        pdf.save('Invoice#' + this.invoiceData.invoiceNumber + '_' + this.invoiceData.billTo + '.pdf');
      });
    }
  }

}
