/**
 * Represents an access token response object containing details of an access token.
 */
export class AccessTokenResponse {
  accessToken: string; // The access token value.
  tokenType: string; // The type of the access token (e.g., "Bearer").
  expiresIn: number; // Time duration in seconds until the access token expires.

  constructor(accessToken: string, tokenType: string, expiresIn: number) {
    this.accessToken = accessToken;
    this.tokenType = tokenType;
    this.expiresIn = expiresIn;
  }
}
