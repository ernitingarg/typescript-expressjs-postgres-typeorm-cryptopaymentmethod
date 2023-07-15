import { PaymentOption } from "../../enums/PaymentOption";

/**
 * Represents a payment request object containing details for initiating a payment.
 */
export class PaymentRequest {
  paymentOption: PaymentOption; // The selected payment option
  orderCurrency: string; // The currency of the payment order
  orderAmount: number; // The amount of the payment order

  constructor(
    paymentOption: PaymentOption,
    orderCurrency: string,
    orderAmount: number
  ) {
    this.paymentOption = paymentOption;
    this.orderCurrency = orderCurrency;
    this.orderAmount = orderAmount;
  }
}
