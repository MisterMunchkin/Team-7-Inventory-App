import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Invoice } from '../shared/models/invoice';
import { InvoiceFormDialogComponent } from './invoice-form-dialog/invoice-form-dialog.component';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements AfterViewInit {
  collectionId: string = 'invoices';
  @ViewChild(MatTable) table!: MatTable<Invoice>;
  $dataSource: Observable<Invoice[]>;
  dataSource!: MatTableDataSource<Invoice>;
  invoiceList: Array<Invoice> = [];

  displayedColumns = ['invoiceNumber', 'billTo', 'total', 'actions']

  constructor(
    private dialog: MatDialog,
    private firestore: AngularFirestore
  ) {
    var ref: AngularFirestoreCollection<Invoice> = this.firestore.collection<Invoice>(this.collectionId);
    this.$dataSource = ref.valueChanges({idField: 'id'});
  }

  ngAfterViewInit(): void {
    this.$dataSource.subscribe(data => {
      this.invoiceList = data;
      this.dataSource = new MatTableDataSource(data);
      this.table.dataSource = this.dataSource;
    })
  }

  addDialog() {
    const nextInvoiceNumber = this.getNextInvoiceNumber();
    const dialogRef = this.dialog.open(InvoiceFormDialogComponent, {
      width: '95vw',
      data: nextInvoiceNumber
    });

    dialogRef.afterClosed()
    .subscribe((result: Invoice) => {
      if (result) {
        //Send to Firebase
        this.firestore.collection(this.collectionId).doc().set(result);
      }
    });
  }

  editDialog(data: Invoice) {
    const dialogRef = this.dialog.open(InvoiceFormDialogComponent, {
      width: '95vw',
      data: data
    });

    dialogRef.afterClosed()
    .subscribe((result: Invoice) => {
      if (result) {
        this.firestore.collection(this.collectionId).doc(result?.id).set(result);
      }
    });
  }

  deleteDialog(data: Invoice) {

  }

  getNextInvoiceNumber(): number {
    if (this.invoiceList.length > 0) {
      //sort list and get the highest number
      const nextInvoiceNumber = this.invoiceList.sort((n1, n2) => n1.invoiceNumber - n2.invoiceNumber)[0]; //get the highest number
      return nextInvoiceNumber.invoiceNumber + 1;
    } else {
      //return 1 to start the invoice cycle
      return 1
    }
  }
}
