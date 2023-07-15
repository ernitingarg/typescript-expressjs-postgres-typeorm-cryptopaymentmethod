import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { PaymentCollection } from "../entities/PaymentCollection";
import { PaymentFactory } from "../payment/factories/PaymentFactory";
import { PaymentRequest } from "../payment/requests/PaymentRequest";

/**
 * The PaymentCollectionController handles HTTP requests related to payment collections.
 * It interacts with the {@link PaymentCollection} entity and communicates with the data source.
 
 * It also uses the PaymentFactory to create and process payment requests.
 */
export class PaymentCollectionController {
  private paymentCollectionRepository =
    AppDataSource.getRepository(PaymentCollection);

  /**
   * Creates a payment collection based on the provided payment request.
   * @param request - The Express request object.
   * @param response - The Express response object.
   * @param next - The next middleware function.
   * @returns A promise that resolves to the created payment collection.
   */
  async createPaymentCollection(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    // Extract payment details from the request body
    const { payment_method_id, order_currency, order_amount } = request.body;

    // Create a PaymentRequest object
    const paymentRequest = Object.assign(
      new PaymentRequest(payment_method_id, order_currency, order_amount)
    );

    // Make a payment request using the PaymentFactory based on the payment option
    const paymentResponse = await PaymentFactory.GetPaymentInstance(
      paymentRequest.paymentOption
    ).makePaymentRequest(paymentRequest);

    // Create and populate a PaymentCollection object
    const paymentCollection = new PaymentCollection();
    paymentCollection.payment_reference = paymentResponse.paymentReference;
    paymentCollection.order_currency = paymentResponse.orderCurrency;
    paymentCollection.order_amount = paymentResponse.orderAmount;
    paymentCollection.expiry_date = new Date(paymentResponse.expiryDate);
    paymentCollection.notify_secret = paymentResponse.notifySecret;
    paymentCollection.access_token = paymentResponse.accessToken;
    paymentCollection.token_type = paymentResponse.tokenType;
    paymentCollection.expires_in = paymentResponse.expiresIn;
    paymentCollection.hosted_url = paymentResponse.hostedUrl;
    paymentCollection.crypto_currency = paymentResponse.cryptoCurrency;
    paymentCollection.crypto_amount = paymentResponse.cryptoAmount;

    // Save the payment collection to the data source
    await this.paymentCollectionRepository.save(paymentCollection);

    // Send the created payment collection as a JSON response
    response.json(paymentCollection);
  }

  /**
   * Retrieves a payment collection based on the provided payment reference.
   * @param request - The Express request object.
   * @param response - The Express response object.
   * @param next - The next middleware function.
   * @returns A promise that resolves to the retrieved payment collection.
   */
  async getPaymentCollection(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    // Extract the payment reference from the request parameters
    const paymentReference = request.params.id;

    // Find the payment collection in the data source and return
    return await this.paymentCollectionRepository.findOne({
      where: { payment_reference: paymentReference },
    });
  }
}
