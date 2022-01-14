import { MetricDB } from './../../shared/data/metrics';
import { Inventory } from './../../shared/models/inventory';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-inventory-form-dialog',
  templateUrl: './inventory-form-dialog.component.html',
  styleUrls: ['./inventory-form-dialog.component.scss']
})
export class InventoryFormDialogComponent implements OnInit {
  inventoryForm!: FormGroup;
  inventoryData: Inventory;

  cleanDataForm: Inventory = {
    name: '',
    quantity: 0,
    metric: '',
    pricePerQuantity: 0,
    dateReceived: new Date().toLocaleDateString(),
    dateOpened: ''
  };

  isEdit: boolean = false;
  metrics: Array<string> = MetricDB.metrics;

  constructor(public dialogRef: MatDialogRef<InventoryFormDialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data: Inventory) {
    if (data) {
      //edit inventory
      console.log(data);
      this.inventoryData = JSON.parse(JSON.stringify(data));
      this.isEdit = true;
    } else {
      //add inventory
      this.inventoryData = this.cleanDataForm;
      this.isEdit = false;
    }
  }

  ngOnInit(): void {
    this.inventoryForm = new FormGroup({
      name: new FormControl(this.inventoryData.name, [Validators.required]),
      quantity: new FormControl(this.inventoryData.quantity, [Validators.required]),
      metric: new FormControl(this.inventoryData.metric, [Validators.required]),
      pricePerQuantity: new FormControl(this.inventoryData.pricePerQuantity, [Validators.required]),
      dateReceived: new FormControl(new Date(this.inventoryData.dateReceived), [Validators.required]),
      dateOpened: new FormControl((this.inventoryData.dateOpened) ? new Date(this.inventoryData.dateOpened) : null)
    });
  }

  onSubmit() {
    if (this.inventoryForm.valid) {
      let formGroupValues = this.inventoryForm.value;

      this.inventoryData.name = formGroupValues.name;
      this.inventoryData.quantity = formGroupValues.quantity;
      this.inventoryData.metric = formGroupValues.metric;
      this.inventoryData.pricePerQuantity = formGroupValues.pricePerQuantity;

      const received = formGroupValues.dateReceived as Date;
      const opened = formGroupValues.dateOpened as Date;
      this.inventoryData.dateReceived = received.toLocaleDateString();
      this.inventoryData.dateOpened = opened?.toLocaleDateString() || '';

      this.dialogRef.close(this.inventoryData);
    }
  }
}
