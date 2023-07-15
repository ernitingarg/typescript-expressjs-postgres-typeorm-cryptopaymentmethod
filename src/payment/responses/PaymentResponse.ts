/**
 * Represents a payment response object containing various details related to a payment.
 */
export class PaymentResponse {
  paymentReference: string; // Unique Payment Reference Number that identifies this payment
  orderCurrency: string; // Currency that the merchant will receive
  orderAmount: number; // The amount of currency that the merchant wants to receive
  expiryDate: string; // Expiry date or timestamp for the payment.
  notifySecret: string; // The shared secret that will be used to sign the notification
  accessToken: string; // Oauth2 access token used specifically for this payment request
  tokenType: string; // Type of Oauth2 authentication token
  expiresIn: number; // Time duration in seconds until the access token expires.
  hostedUrl: string; // Redirect the payer's browser to this URL for them to make payment
  cryptoCurrency: string; // The cryptocurrency of the account API ID selected.
  cryptoAmount: number; // The amount in cryptocurrency

  constructor(
    paymentReference: string,
    orderCurrency: string,
    orderAmount: number,
    expiryDate: string,
    notifySecret: string,
    accessToken: string,
    tokenType: string,
    expiresIn: number,
    hostedUrl: string,
    cryptoCurrency: string,
    cryptoAmount: number
  ) {
    this.paymentReference = paymentReference;
    this.orderCurrency = orderCurrency;
    this.orderAmount = orderAmount;
    this.expiryDate = expiryDate;
    this.notifySecret = notifySecret;
    this.accessToken = accessToken;
    this.tokenType = tokenType;
    this.expiresIn = expiresIn;
    this.hostedUrl = hostedUrl;
    this.cryptoCurrency = cryptoCurrency;
    this.cryptoAmount = cryptoAmount;
  }
}
