import { PaymentOption } from "../../enums/PaymentOption";
import { IPayment } from "../interfaces/IPayment";
import { IPaymentProvider } from "../interfaces/IPaymentProvider";
import { PaymentRequest } from "../requests/PaymentRequest";
import { PaymentResponse } from "../responses/PaymentResponse";

/**
 * Implementation of the IPayment interface for making Visa payments.
 */
export class VisaPayment implements IPayment {
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
    // Set the payment option to Visa (or any other initialization specific to visa payment)
    paymentRequest.paymentOption = PaymentOption.Visa;

    console.log(
      `Making payment for ${paymentRequest.paymentOption} payment option.`
    );

    // Delegate the payment request to the underlying payment provider
    return this.provider.makePaymentRequest(paymentRequest);
  }
}
