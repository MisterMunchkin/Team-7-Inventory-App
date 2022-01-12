import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource} from '@angular/material/table';
import { Inventory } from '../shared/models/inventory';
import { InventoryFormDialogComponent } from './inventory-form-dialog/inventory-form-dialog.component';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements AfterViewInit {
  @ViewChild(MatTable) table!: MatTable<Inventory>;
  dataSource!: MatTableDataSource<Inventory>;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'quantity', 'metric', 'pricePerItem', 'dateReceived', 'dateOpened', 'total', 'actions'];

  constructor(
    private dialog: MatDialog
  ) { }

  ngAfterViewInit(): void {
    var tempPopList = [
      {
        name: 'Salt',
        quantity: 5,
        metric: 'kg',
        pricePerQuantity: 30,
        dateReceived: new Date('1-1-2022')
      }
    ] as Array<Inventory>

    this.dataSource = new MatTableDataSource(tempPopList);
    this.table.dataSource = this.dataSource;
  }

  addDialog() {
    const dialogRef = this.dialog.open(InventoryFormDialogComponent, {});

    dialogRef.afterClosed()
    .subscribe((result: Inventory) => {
      if (result) {
        //we add to database
      }
    })
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
      }
    })
  }

}
