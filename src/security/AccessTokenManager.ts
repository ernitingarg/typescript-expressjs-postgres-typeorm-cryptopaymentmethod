import axios from "axios";
import { AccessTokenRequest } from "../payment/requests/AccessTokenRequest";
import { AccessTokenResponse } from "../payment/responses/AccessTokenResponse";

export class AccessTokenManager {
  /**
   * Generates an access token by sending a POST request to the
   * specified URL with the provided access token request parameters.
   *
   * @param url - The URL to send the request to.
   * @param accessTokenRequest - The access token {@link AccessTokenRequest} parameters.
   * @returns A promise that resolves to the a {@link AccessTokenResponse}.
   */
  async generateAccessToken(
    url: string,
    accessTokenRequest: AccessTokenRequest
  ): Promise<AccessTokenResponse> {
    try {
      // Prepare POST request
      const params = new URLSearchParams();
      params.set("client_id", accessTokenRequest.clientId);
      params.set("client_secret", accessTokenRequest.clientSecret);
      params.set("grant_type", accessTokenRequest.grantType);

      const options = {
        method: "POST",
        url: url,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
          Authorization: "",
        },
        data: params,
      };

      console.log("Sending POST request to generate access token.");
      const apiResponse = await axios(options);
      const responseBody = apiResponse.data;

      // Create the access token response object
      const response = new AccessTokenResponse(
        responseBody.access_token,
        responseBody.token_type,
        responseBody.expires_in
      );

      console.log(
        "Access token generated successfully.\nAccess token details:",
        response
      );

      return response;
    } catch (error) {
      console.error("Failed to generate access token.");
      throw error; // throw back to middleware
    }
  }
}
