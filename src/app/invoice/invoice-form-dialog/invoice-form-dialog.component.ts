import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Invoice, Item } from 'src/app/shared/models/invoice';
import { AbstractControl, UntypedFormArray, UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import cloneDeep from 'lodash.clonedeep';

@Component({
  templateUrl: './invoice-form-dialog.component.html',
  styleUrls: ['./invoice-form-dialog.component.scss']
})
export class InvoiceFormDialogComponent implements OnInit {
  invoiceForm!: UntypedFormGroup;
  invoiceData: Invoice;

  itemsFormArray: UntypedFormArray = new UntypedFormArray([], [Validators.minLength(1)]);
  items: Array<Item> = [];

  cleanDataForm: Invoice = {
    invoiceNumber: 0,
    createdDate: new Date().toLocaleDateString(),
    dueDate: new Date().toLocaleDateString(),
    billTo: '',
    shipTo: '',
    shippingAddress: '',
    items: [],
    subTotal: 0,
    discount: 0,
    deliveryFee: 0,
    total: 0,
    notes: '',
    terms: ''
  };

  isEdit: boolean = false;

  constructor(public dialogRef: MatDialogRef<InvoiceFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number | Invoice
  ) {
    if (typeof data === "number") { //add dialog
      this.isEdit = false;

      this.invoiceData = this.cleanDataForm;
      this.invoiceData.invoiceNumber = data;
    } else { //edit dialog
      this.isEdit = true;

      this.invoiceData = cloneDeep(data);
      this.getItemsFormArray();
    }
  }

  ngOnInit(): void {
    this.invoiceForm = new UntypedFormGroup({
      dueDate: new UntypedFormControl(new Date(this.invoiceData.dueDate), [Validators.required]),
      billTo: new UntypedFormControl(this.invoiceData.billTo, [Validators.required]),
      shipTo: new UntypedFormControl(this.invoiceData.shipTo),
      shippingAddress: new UntypedFormControl(this.invoiceData.shippingAddress),
      items: this.itemsFormArray,
      subTotal: new UntypedFormControl({value: this.invoiceData.subTotal, disabled: true}, [Validators.required, Validators.min(1)]),
      discount: new UntypedFormControl(this.invoiceData.discount, [Validators.min(0)]),
      deliveryFee: new UntypedFormControl(this.invoiceData.deliveryFee, [Validators.min(0)]),
      total: new UntypedFormControl({value: this.invoiceData.total, disabled: true}, [Validators.min(0)]),
      notes: new UntypedFormControl(this.invoiceData.notes),
      terms: new UntypedFormControl(this.invoiceData.terms)
    });
  }

  addItem() {
    const group = new UntypedFormGroup({
      name: new UntypedFormControl('', [Validators.required]),
      description: new UntypedFormControl(''),
      quantity: new UntypedFormControl('', [Validators.required, Validators.min(1)]),
      pricePerItem: new UntypedFormControl('', [Validators.required, Validators.min(1)]),
      amount: new UntypedFormControl({value: '', disabled: true}, [Validators.required, Validators.min(1)])
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
      var formGroup = item as UntypedFormGroup;
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
    const items = this.invoiceData.items;

    items.forEach(item => {
      const group = new UntypedFormGroup({
        name: new UntypedFormControl(item.name, [Validators.required]),
        description: new UntypedFormControl(item.description),
        quantity: new UntypedFormControl(item.quantity, [Validators.required, Validators.min(1)]),
        pricePerItem: new UntypedFormControl(item.pricePerItem, [Validators.required, Validators.min(1)]),
        amount: new UntypedFormControl({value: item.amount, disabled: true}, [Validators.required, Validators.min(1)])
      });

      this.itemsFormArray.push(group);
    });
  }

  onSubmit() {
    //tbc
    if (this.invoiceForm.valid) {
      const invoice = this.invoiceForm.getRawValue();
      //We might be ablt to just as Invoice instead of mapping one by one
      this.invoiceData.billTo = invoice.billTo;
      this.invoiceData.deliveryFee = invoice.deliveryFee;
      this.invoiceData.discount = invoice.discount;
      this.invoiceData.notes = invoice.notes;
      this.invoiceData.shipTo = invoice.shipTo;
      this.invoiceData.shippingAddress = invoice.shippingAddress;
      this.invoiceData.subTotal = invoice.subTotal;
      this.invoiceData.terms = invoice.terms;
      this.invoiceData.total = invoice.total;

      //Save dates as date string because firebase does this weird thing where it returns
      //Dates as timestamp and brings a bunch of problems to the front end
      const dueDate = invoice.dueDate as Date;
      this.invoiceData.dueDate = dueDate.toLocaleDateString() || '';

      const items = invoice.items as Array<Item>;
      this.invoiceData.items = items;

      this.dialogRef.close(cloneDeep(this.invoiceData));
    }
  }

  removeItem(index: number) {
    this.itemsFormArray.removeAt(index);
    this.computeSubTotal();
  }
}
