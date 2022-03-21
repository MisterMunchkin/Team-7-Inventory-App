import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Invoice } from '../shared/models/invoice';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements AfterViewInit {
  collectionId: string = 'invoice';
  @ViewChild(MatTable) table!: MatTable<Invoice>;
  $dataSource: Observable<Invoice[]>;
  dataSource!: MatTableDataSource<Invoice>;

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
      this.dataSource = new MatTableDataSource(data);
      this.table.dataSource = this.dataSource;
    })
  }

}
