import { PaymentOption } from "../../enums/PaymentOption";
import { IPaymentProvider } from "../interfaces/IPaymentProvider";
import { PaymentRequest } from "../requests/PaymentRequest";
import { PaymentResponse } from "../responses/PaymentResponse";
import { v4 as uuidv4 } from "uuid";

/**
 * Implementation of the IPaymentProvider interface for the Mock payment provider.
 */
export class MockPaymentProvider implements IPaymentProvider {
  static accessToken: string | null;

  /**
   * {@inheritdoc}
   */
  async getAccessToken(): Promise<string> {
    throw new Error(
      "Getting access token is not implemented for Mock payment provider."
    );
  }

  /**
   * {@inheritdoc}
   */
  async makePaymentRequest(
    paymentRequest: PaymentRequest
  ): Promise<PaymentResponse> {
    if (
      paymentRequest.paymentOption === PaymentOption.Nets ||
      paymentRequest.paymentOption === PaymentOption.Visa
    ) {
      // Create fake response

      return new PaymentResponse(
        `${paymentRequest.paymentOption.toLowerCase()}_${uuidv4()}`,
        paymentRequest.orderCurrency,
        paymentRequest.orderAmount,
        new Date().toISOString(),
        `${paymentRequest.paymentOption.toLowerCase()}_notify_secret`,
        `${paymentRequest.paymentOption.toLowerCase()}_access_token`,
        "Bearer",
        3600,
        `https://${paymentRequest.paymentOption.toLowerCase()}-hosted-url`,
        null,
        null
      );
    }

    throw new Error(
      `Create payment request for ${paymentRequest.paymentOption} 
      method is not implemented for Mock payment provider.`
    );
  }
}
