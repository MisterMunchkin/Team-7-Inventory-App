import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Invoice, Item } from 'src/app/shared/models/invoice';
import { FormArray, FormControl, FormGroup, Validators} from '@angular/forms'

@Component({
  templateUrl: './invoice-form-dialog.component.html',
  styleUrls: ['./invoice-form-dialog.component.scss']
})
export class InvoiceFormDialogComponent implements OnInit {
  invoiceForm!: FormGroup;
  invoiceData: Invoice;

  itemsFormArray: FormArray = new FormArray([]);
  items: Array<Item> = [];

  cleanDataForm: Invoice = {
    invoiceNumber: 0,
    createdDate: new Date(),
    dueDate: new Date(),
    billTo: '',
    shipTo: '',
    Items: [],
    subTotal: 0,
    discount: 0,
    deliveryFee: 0,
    total: 0,
    notes: '',
    terms: ''
  };

  isEdit: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: number | Invoice
  ) {
    if (typeof data === "number") { //add dialog
      console.log(data);
      this.isEdit = false;

      this.invoiceData = this.cleanDataForm;
      this.invoiceData.invoiceNumber = data;
    } else { //edit dialog
      this.isEdit = true;

      this.invoiceData = JSON.parse(JSON.stringify(data));
      this.getItemsFormArray();
    }
  }

  addItem() {
    const group = new FormGroup({
      name: new FormControl(''),
      description: new FormControl(''),
      quantity: new FormControl(''),
      pricePerItem: new FormControl(''),
      amount: new FormControl('')
    });

    this.itemsFormArray.push(group);
  }

  getItemsFormArray() {
    const items = this.invoiceData.Items;

    items.forEach(item => {
      const group = new FormGroup({
        name: new FormControl(item.name, [Validators.required]),
        description: new FormControl(item.description),
        quantity: new FormControl(item.quantity, [Validators.required, Validators.min(1)]),
        pricePerItem: new FormControl(item.pricePerItem, [Validators.required, Validators.min(1)]),
        amount: new FormControl(item.amount, [Validators.required, Validators.min(1)])
      });

      this.itemsFormArray.push(group);
    });
  }

  ngOnInit(): void {
    this.invoiceForm = new FormGroup({
      dueDate: new FormControl(this.invoiceData.dueDate, [Validators.required]),
      billTo: new FormControl(this.invoiceData.billTo, [Validators.required]),
      shipTo: new FormControl(this.invoiceData.shipTo),
      items: this.itemsFormArray
    });
  }

  onSubmit() {
    //tbc
  }

  removeItem(index: number) {
    this.itemsFormArray.removeAt(index);
  }
}
