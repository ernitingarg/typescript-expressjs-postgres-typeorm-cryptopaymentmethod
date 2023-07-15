import { PaymentOption } from "../../enums/PaymentOption";
import { IPayment } from "../interfaces/IPayment";
import { CryptoPayment } from "../methods/CryptoPayment";
import { NetsPayment } from "../methods/NetsPayment";
import { VisaPayment } from "../methods/VisaPayment";
import { MockPaymentProvider } from "../providers/MockPaymentProvider";
import { TripleAPaymentProvider } from "../providers/TripleAPaymentProvider";

/**
 * The PaymentFactory class represents a factory for creating
 * payment instances based on the given payment option.
 *
 * It incorporates the Factory Method and Bridge design patterns.
 */
export class PaymentFactory {
  /**
   * GetPaymentInstance method returns an instance of IPayment
   * based on the provided payment option.
   * @param paymentOption - The payment option for which the payment instance is required.
   * @returns An instance of IPayment based on the provided payment option.
   * @throws Error if an invalid payment option is provided.
   */
  static GetPaymentInstance(paymentOption: PaymentOption): IPayment {
    switch (paymentOption) {
      case PaymentOption.Nets:
        return new NetsPayment(new MockPaymentProvider());
      case PaymentOption.Visa:
        return new VisaPayment(new MockPaymentProvider());
      case PaymentOption.Crypto:
        return new CryptoPayment(new TripleAPaymentProvider());
      default:
        throw new Error("Invalid payment option.");
    }
  }
}
