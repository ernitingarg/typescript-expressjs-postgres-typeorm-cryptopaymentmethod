import { IPayment } from "./IPayment";

/**
 * The IPaymentProvider interface represents a contract for a payment provider.
 */
export interface IPaymentProvider extends IPayment {
  /**
   * Retrieves an OAuth access token required for authentication with the payment provider.
   *
   * @returns A Promise that resolves to a string representing the access token.
   */
  getAccessToken(): Promise<string>;
}
