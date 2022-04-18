export interface Invoice {
  invoiceNumber: number,
  createdDate: Date,
  dueDate: Date,
  billTo: string,
  shipTo?: string,
  Items: Array<Item>,
  subTotal: number,
  discount?: number,
  deliveryFee?: number,
  total: number,
  notes: string,
  terms: string
}

export interface Item {
  name: string,
  description: string,
  quantity: number,
  pricePerItem: number,
  amount: number
}
