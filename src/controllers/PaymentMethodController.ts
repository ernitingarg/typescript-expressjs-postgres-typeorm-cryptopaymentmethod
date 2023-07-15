import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { PaymentMethod } from "../entities/PaymentMethod";

/**
 * The PaymentMethodController handles HTTP requests related to payment methods.
 * It interacts with the {@link PaymentMethod} entity and communicates with the data source.
 */
export class PaymentMethodController {
  private paymentMethodRepository = AppDataSource.getRepository(PaymentMethod);

  /**
   * Retrieves all payment methods.
   * @param _request - The Express request object.
   * @param _response - The Express response object.
   * @param _next - The next middleware function.
   * @returns A promise that resolves to an array of payment methods.
   */
  async getAllPaymentMethods(
    _request: Request,
    _response: Response,
    _next: NextFunction
  ) {
    return this.paymentMethodRepository.find();
  }
}
