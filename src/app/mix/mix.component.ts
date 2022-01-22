import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MixFormDialogComponent } from './mix-form-dialog/mix-form-dialog.component';

@Component({
  selector: 'app-mix',
  templateUrl: './mix.component.html',
  styleUrls: ['./mix.component.scss']
})
export class MixComponent implements OnInit {

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  addDialog() {
    const dialogRef = this.dialog.open(MixFormDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
      }
    });
  }
}
