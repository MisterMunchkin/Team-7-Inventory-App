export interface Invoice {
  id?: string,
  invoiceNumber: number,
  createdDate: string,
  dueDate: string,
  billTo: string,
  shipTo?: string,
  shippingAddress?: string,
  items: Array<Item>,
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
