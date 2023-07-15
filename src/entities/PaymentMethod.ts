import { Entity, PrimaryColumn, Column } from "typeorm";
import { PaymentOption } from "../enums/PaymentOption";

/**
 * Represents a payment method entity in the application's ORM context.
 * This entity class is used for ORM to map to a database table.
 */

@Entity()
export class PaymentMethod {
  @PrimaryColumn({ type: "enum", enum: PaymentOption })
  id: PaymentOption;

  @Column()
  description: string;
}
