import { Inventory } from './../shared/models/inventory';
import { ConfirmationDialogModel, ConfirmationDialogComponent } from './../shared/components/confirmation-dialog/confirmation-dialog.component';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource} from '@angular/material/table';
import { InventoryFormDialogComponent } from './inventory-form-dialog/inventory-form-dialog.component';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements AfterViewInit {
  collectionId: string = 'inventory';
  @ViewChild(MatTable) table!: MatTable<Inventory>;
  $dataSource: Observable<Inventory[]>
  dataSource!: MatTableDataSource<Inventory>;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'quantity', 'metric', 'pricePerItem', 'dateReceived', 'dateOpened', 'total', 'actions'];

  constructor(
    private dialog: MatDialog,
    private firestore: AngularFirestore
  ) {
    var ref: AngularFirestoreCollection<Inventory> = this.firestore.collection<Inventory>(this.collectionId);
    this.$dataSource = ref.valueChanges({idField: 'id'});
  }

  ngAfterViewInit(): void {
    this.$dataSource.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.table.dataSource = this.dataSource;
    });

    // var tempPopList = [
    //   {
    //     name: 'Salt',
    //     quantity: 5,
    //     metric: 'l',
    //     pricePerQuantity: 30,
    //     dateReceived: new Date('1-1-2022')
    //   }
    // ] as Array<Inventory>
    //this.dataSource = new MatTableDataSource(tempPopList);
    //this.table.dataSource = this.dataSource;
  }

  addDialog() {
    const dialogRef = this.dialog.open(InventoryFormDialogComponent, {});

    dialogRef.afterClosed()
    .subscribe((result: Inventory) => {
      if (result) {
        //we add to database
        this.firestore.collection(this.collectionId).doc().set(result);

      }
    })
  }

  addQuantity(data: Inventory) {
    data.quantity = data.quantity + 1;
    this.firestore.collection(this.collectionId).doc(data?.id).set(data);
  }

  deleteDialog(data: Inventory) {
    const message = 'Deleting an inventory item will delete the whole thing not just the quantity.';
    const dialogData = new ConfirmationDialogModel("Are you sure you want to delete this?", message);

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      maxHeight: '600px',
      data: dialogData
    });

    dialogRef.afterClosed()
    .subscribe(result => {
      if (result) {
        this.firestore.collection(this.collectionId).doc(data?.id).delete();
      }
    });
  }

  editDialog(data: Inventory) {
    const dialogRef = this.dialog.open(InventoryFormDialogComponent,
    {
      data: data
    });

    dialogRef.afterClosed()
    .subscribe((result: Inventory) => {
      if (result) {
        //we edit to database
        this.firestore.collection(this.collectionId).doc(result?.id).set(result);
      }
    })
  }

  getTotal(data: Inventory) {
    return Number(data.quantity * data.pricePerQuantity).toFixed(2); //round to two decimals
  }

  removeQuantity(data: Inventory) {
    if (data.quantity > 0) {
      data.quantity = data.quantity - 1;
      this.firestore.collection(this.collectionId).doc(data?.id).set(data);
    }
  }
}
