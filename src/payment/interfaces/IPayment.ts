import { PaymentRequest } from "../requests/PaymentRequest";
import { PaymentResponse } from "../responses/PaymentResponse";

/**
 * The IPayment interface represents a contract for payment-related operations.
 */
export interface IPayment {
  /**
   * Initiates a payment request using the provided payload.
   *
   * @param paymentRequest - An instance of {@link PaymentRequest}
   * containing details of requested payload.
   *
   * @returns A Promise that resolves to a {@link PaymentResponse}
   * representing the result of the payment request.
   */
  makePaymentRequest(paymentRequest: PaymentRequest): Promise<PaymentResponse>;
}
