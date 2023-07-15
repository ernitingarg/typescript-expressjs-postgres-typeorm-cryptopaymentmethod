import { body, param } from "express-validator";
import { PaymentMethodController } from "./controllers/PaymentMethodController";
import { PaymentCollectionController } from "./controllers/PaymentCollectionController";
import { PaymentOption } from "./enums/PaymentOption";

const paymentMethodEnumValues = Object.values(PaymentOption);

// Route configuration array
export const Routes = [
  {
    method: "get",
    route: "/payment-methods",
    controller: PaymentMethodController,
    action: "getAllPaymentMethods",
    validation: [],
  },

  {
    method: "post",
    route: "/payment-collections",
    controller: PaymentCollectionController,
    action: "createPaymentCollection",
    validation: [
      body("payment_method_id")
        .isString()
        .notEmpty()
        .withMessage("Payment method id must be a non-empty string")
        .isIn(paymentMethodEnumValues)
        .withMessage(
          `Invalid payment method id. Valid values are ${paymentMethodEnumValues.join(
            ", "
          )}`
        ),
      body("order_currency")
        .isString()
        .notEmpty()
        .withMessage("Order currency must be a non-empty string")
        .isLength({ min: 3, max: 3 })
        .withMessage(
          "Order currency must be a valid supported currency and have a length of 3 characters"
        )
        .matches(/^[A-Z]+$/)
        .withMessage("Order currency must consist of uppercase letters only"),
      body("order_amount")
        .isNumeric()
        .withMessage("Order amount must be a numeric value"),
    ],
  },

  {
    method: "get",
    route: "/payment-collections/:id",
    controller: PaymentCollectionController,
    action: "getPaymentCollection",
    validation: [
      param("id")
        .isString()
        .notEmpty()
        .withMessage("Payment reference id must be a non-empty string"),
    ],
  },
];
