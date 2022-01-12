export interface Inventory {
  name: string,
  quantity: number,
  metric: string,
  pricePerQuantity: number,
  dateReceived: Date,
  dateOpened?: Date
}
