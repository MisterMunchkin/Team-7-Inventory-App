import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Invoice, Item } from 'src/app/shared/models/invoice';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators} from '@angular/forms'

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

  ngOnInit(): void {
    this.invoiceForm = new FormGroup({
      dueDate: new FormControl(this.invoiceData.dueDate, [Validators.required]),
      billTo: new FormControl(this.invoiceData.billTo, [Validators.required]),
      shipTo: new FormControl(this.invoiceData.shipTo),
      items: this.itemsFormArray,
      subTotal: new FormControl({value: this.invoiceData.subTotal, disabled: true}, [Validators.required, Validators.min(1)]),
      discount: new FormControl(this.invoiceData.discount, [Validators.min(0)]),
      deliveryFee: new FormControl(this.invoiceData.deliveryFee, [Validators.min(0)]),
      total: new FormControl({value: this.invoiceData.total, disabled: true}, [Validators.min(0)]),
      notes: new FormControl(this.invoiceData.notes),
      terms: new FormControl(this.invoiceData.terms)
    });
  }

  addItem() {
    const group = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      quantity: new FormControl('', [Validators.required, Validators.min(1)]),
      pricePerItem: new FormControl('', [Validators.required, Validators.min(1)]),
      amount: new FormControl({value: '', disabled: true}, [Validators.required, Validators.min(1)])
    });

    this.itemsFormArray.push(group);
  }

  //Computes the amount for each line item: quantity * price
  computeAmount(index: number) {
    var control = this.itemsFormArray.controls[index];

    var quantity = control.value["quantity"];
    var pricePerItem = control.value["pricePerItem"];
    var amount = quantity * pricePerItem;

    control.patchValue({
      amount: amount
    });

    this.computeSubTotal();
  }

  //Computes the subtotal from the amount of each line item: summary(amount)
  private computeSubTotal() {
    var subTotal = 0

    this.itemsFormArray.controls.forEach((item : AbstractControl) => {
      var formGroup = item as FormGroup;
      subTotal += formGroup.controls["amount"].value || 0;
    });

    this.invoiceForm.patchValue({
      subTotal: subTotal
    });

    this.computeTotal();
  }

  //Computes the total based on subTotal, discount, delivery fee
  computeTotal() {
    var total = 0;
    var subTotal = this.invoiceForm.controls["subTotal"].value || 0;
    var discount = this.invoiceForm.controls["discount"].value || 0;
    var deliveryFee = this.invoiceForm.controls["deliveryFee"].value || 0;

    total = (subTotal + deliveryFee) - discount;

    this.invoiceForm.patchValue({
      total: total
    });
  }

  getItemsFormArray() {
    const items = this.invoiceData.Items;

    items.forEach(item => {
      const group = new FormGroup({
        name: new FormControl(item.name, [Validators.required]),
        description: new FormControl(item.description),
        quantity: new FormControl(item.quantity, [Validators.required, Validators.min(1)]),
        pricePerItem: new FormControl(item.pricePerItem, [Validators.required, Validators.min(1)]),
        amount: new FormControl({value: item.amount, disabled: true}, [Validators.required, Validators.min(1)])
      });

      this.itemsFormArray.push(group);
    });
  }

  onSubmit() {
    //tbc
  }

  removeItem(index: number) {
    this.itemsFormArray.removeAt(index);
    this.computeSubTotal();
  }
}
