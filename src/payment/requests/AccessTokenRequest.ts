/**
 * Represents an access token request object containing details for generating an access token.
 */
export class AccessTokenRequest {
  clientId: string; // The client ID for authentication.
  clientSecret: string; // The client secret for authentication.
  grantType: string; // The grant type for requesting the access token.

  constructor(
    clientId: string,
    clientSecret: string,
    grantType = "client_credentials"
  ) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.grantType = grantType;
  }
}
