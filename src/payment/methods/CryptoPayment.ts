import { PaymentOption } from "../../enums/PaymentOption";
import { IPayment } from "../interfaces/IPayment";
import { IPaymentProvider } from "../interfaces/IPaymentProvider";
import { PaymentRequest } from "../requests/PaymentRequest";
import { PaymentResponse } from "../responses/PaymentResponse";

/**
 * Implementation of the IPayment interface for making crypto payments.
 */
export class CryptoPayment implements IPayment {
  private readonly provider: IPaymentProvider;

  constructor(provider: IPaymentProvider) {
    this.provider = provider;
  }

  /**
   * @inheritdoc
   */
  async makePaymentRequest(
    paymentRequest: PaymentRequest
  ): Promise<PaymentResponse> {
    // Set the payment option to Crypto (or any other initialization specific to crypto payment)
    paymentRequest.paymentOption = PaymentOption.Crypto;

    console.log(
      `Making payment for ${paymentRequest.paymentOption} payment option.`
    );

    // Delegate the payment request to the underlying payment provider
    return this.provider.makePaymentRequest(paymentRequest);
  }
}
