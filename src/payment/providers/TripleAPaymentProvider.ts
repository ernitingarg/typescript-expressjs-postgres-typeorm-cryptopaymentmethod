import { tripleAPaymentProviderConfig } from "../../config";
import { AccessTokenManager } from "../../security/AccessTokenManager";
import { AccessTokenRequest } from "../requests/AccessTokenRequest";
import { IPaymentProvider } from "../interfaces/IPaymentProvider";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { PaymentResponse } from "../responses/PaymentResponse";
import { PaymentRequest } from "../requests/PaymentRequest";

/**
 * Implementation of the IPaymentProvider interface for the TripleA payment provider.
 *
 * Note: Access token is currently added to internal memory
 */
export class TripleAPaymentProvider implements IPaymentProvider {
  static accessToken: string | null;

  /**
   * {@inheritdoc}
   */
  async getAccessToken(): Promise<string> {
    // Check if the access token is already in memory
    if (TripleAPaymentProvider.accessToken) {
      return TripleAPaymentProvider.accessToken;
    }

    // Generate an access token using the access token manager
    const accessTokenManager = new AccessTokenManager();
    const accessTokenRequest = new AccessTokenRequest(
      tripleAPaymentProviderConfig.client_id,
      tripleAPaymentProviderConfig.client_secret
    );

    const accessToken = await accessTokenManager.generateAccessToken(
      `${tripleAPaymentProviderConfig.url}/oauth/token`,
      accessTokenRequest
    );

    // Store the access token in memory
    TripleAPaymentProvider.accessToken = accessToken.accessToken;

    return accessToken.accessToken;
  }

  /**
   * @inheritdoc
   */
  async makePaymentRequest(
    paymentRequest: PaymentRequest
  ): Promise<PaymentResponse> {
    // Get the access token required for authentication
    let accessToken = await this.getAccessToken();

    // Prepare the request for making the payment
    const options = {
      method: "POST",
      url: `${tripleAPaymentProviderConfig.url}/payment/account/${tripleAPaymentProviderConfig.test_btc}`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        type: "triplea",
        order_currency: paymentRequest.orderCurrency,
        order_amount: paymentRequest.orderAmount,
        payer_id: uuidv4(),
        success_url: "https://www.success.io/success.html",
        cancel_url: "https://www.failure.io/cancel.html",
      },
    };

    try {
      // Make the payment request using Axios
      const { data } = await axios.request(options);

      // Create a PaymentResponse object from the response data
      const paymentResponse = new PaymentResponse(
        data.payment_reference,
        data.order_currency,
        data.order_amount,
        data.expiry_date,
        data.notify_secret,
        data.access_token,
        data.token_type,
        data.expires_in,
        data.hosted_url,
        data.crypto_currency,
        data.crypto_amount
      );
      console.log(
        "Payment created successfully.Payment details:",
        paymentResponse
      );
      return paymentResponse;
    } catch (error) {
      // Check if the error is due to an invalid access token (401 Unauthorized)
      if (error.response && error.response.status === 401) {
        // Reset the access token to null
        TripleAPaymentProvider.accessToken = null;

        // Retry the payment request which will first generate new access token
        return this.makePaymentRequest(paymentRequest);
      }

      // Throw back the original error to middleware if it's not a 401 Unauthorized error
      console.error("Failed to create payment.");
      throw error; // throw back to middleware
    }
  }
}
